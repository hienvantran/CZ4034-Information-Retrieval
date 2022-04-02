import numpy as np

import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim

import torch.nn.functional as F

from transformers import BertTokenizer, BertModel

class CNNBert(nn.Module):
    def __init__(self, bert, n_filters, filter_sizes, output_dim,
                 dropout):

        super().__init__()
        self.bert = bert

        embedding_dim = bert.config.to_dict()['hidden_size']

        #self.embedding = nn.Embedding(vocab_size, embedding_dim)

        self.convs = nn.ModuleList([
            nn.Conv2d(in_channels=1,
                      out_channels=n_filters,
                      kernel_size=(fs, embedding_dim))
            for fs in filter_sizes
        ])

        self.fc = nn.Linear(len(filter_sizes) * n_filters, output_dim)

        self.dropout = nn.Dropout(dropout)

    def forward(self, text):

        #text = [sent len, batch size]

        #text = text.permute(1, 0)

        #text = [batch size, sent len]
        with torch.no_grad():
            embedded = self.bert(text)[0]

        #embedded = self.embedding(text)

        #embedded = [batch size, sent len, emb dim]

        embedded = embedded.unsqueeze(1)

        #embedded = [batch size, 1, sent len, emb dim]

        conved = [F.relu(conv(embedded)).squeeze(3) for conv in self.convs]

        #conv_n = [batch size, n_filters, sent len - filter_sizes[n]]

        pooled = [F.max_pool1d(conv, conv.shape[2]).squeeze(2)
                  for conv in conved]

        #pooled_n = [batch size, n_filters]

        cat = self.dropout(torch.cat(pooled, dim=1))

        #cat = [batch size, n_filters * len(filter_sizes)]

        return self.fc(cat)


tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
max_input_length = tokenizer.max_model_input_sizes['bert-base-uncased']
init_token_idx = tokenizer.cls_token_id
eos_token_idx = tokenizer.sep_token_id
pad_token_idx = tokenizer.pad_token_id
unk_token_idx = tokenizer.unk_token_id

N_FILTERS = 100
FILTER_SIZES = [2,3,4]
OUTPUT_DIM = 8
DROPOUT = 0.5

bert = BertModel.from_pretrained('bert-base-uncased')
model = CNNBert(bert,N_FILTERS, FILTER_SIZES, OUTPUT_DIM, DROPOUT)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

print(bert)

model.load_state_dict(torch.load('./model/bert_cnn.pt',
                      map_location=torch.device('cpu')))


def predict_sentiment(model, tokenizer, sentence):
    model.eval()
    tokens = tokenizer.tokenize(sentence)
    tokens = tokens[:max_input_length-2]
    indexed = [init_token_idx] + tokenizer.convert_tokens_to_ids(tokens) + [eos_token_idx]
    tensor = torch.LongTensor(indexed).to(device)
    tensor = tensor.unsqueeze(0)
    prediction = torch.sigmoid(model(tensor))
    return torch.argmax(prediction.squeeze()).item()

categories = {0: "Negative", 1:"Neutral",2: "Positive"}

pred_class = predict_sentiment(model,tokenizer, "covid is the worst")
# print(f'Predicted class is: {categories[int(LABEL.vocab.itos[pred_class])]}')
print(f'Predicted class is: ', pred_class)

ES_URL="https://devnet-index.multiversx.com";


######### to get transactions by Contract address ##########
# curl --request GET \
#   --url  ${ES_URL}/transactions/_search \
#   --header 'Content-Type: application/json' \
#   --data '{
#     "_source": false,
#     "size": 2,
#     "from": 0,
# "query": {
#     "term": {
#         "receiver": "erd1qqqqqqqqqqqqqpgqhv2wpezf4hwtvcy4t7s9wlmjklad0k776n9sj9q9hz"
#     }
# },
# "sort": [
#     {
#         "timestamp": {
#             "order": "asc"
#         }
#     }
# ]
# }'

########## To get Logs from transaction by txHash (_id) ##########
# curl --request GET \
#   --url ${ES_URL}/logs/_search \
#   --header 'Content-Type: application/json' \
#   --data '{
#     "_source": ["events"],
#     "query": {
#         "ids": {
#             "values": [ "0b24e4c66354e0d7f542331f6cb4a156560045e8dbfca33063574e60c63ec882", "a9be0aaf74fac0d499d99fb4aeb3cbf0530bf8a95c609eaa1a26cbd77b557ba8" ]
#         }
#     }
# }'

########## To get the status of transactions by txHash (_id) ##########
# curl --request GET \
#   --url  ${ES_URL}/transactions/_search \
#   --header 'Content-Type: application/json' \
#   --data '{
#     "_source": ["status"],
#     "query": {
#         "ids": {
#             "values": [ "0b24e4c66354e0d7f542331f6cb4a156560045e8dbfca33063574e60c63ec882", "a9be0aaf74fac0d499d99fb4aeb3cbf0530bf8a95c609eaa1a26cbd77b557ba8" ]
#         }
#     },
#     "sort": [
#         {
#             "timestamp": {
#                 "order": "asc"
#             }
#         }
#     ]
# }'

########## Get balance ##########
# curl --request GET \
# --url ${ES_URL}/accounts/_search \
# --header 'Content-Type: application/json' \
# --data '{
#             "_source": ["balance"],
#             "query": {
#                    "term": {
#                 "address": "erd1qqqqqqqqqqqqqpgq2l97gw2j4wnlem4y2rx7dudqlssjtwpu0n4sd0u3w2"
#             }
#             }
# }'


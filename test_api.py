import requests

BASE='http://127.0.0.1:8000/'

print('GET patients:')
r=requests.get(BASE+'patients/')
print(r.status_code, r.text)

print('POST new patient:')
pay={'patient_name':'X','age':22,'sex':'M','address':'a','phone_number':'123'}
r=requests.post(BASE+'patients/', json=pay)
print(r.status_code, r.text)

print('GET patients after:')
r=requests.get(BASE+'patients/')
print(r.status_code, r.text)

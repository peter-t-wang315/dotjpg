import sqlite3
import requests
from io import BytesIO
import base64
from concurrent.futures import ThreadPoolExecutor

conn = sqlite3.connect('prisma/legosets.db')
cursor = conn.cursor()
cursor.execute("SELECT id, imgUrl from Legoset")

rows = cursor.fetchall()

def download_image(row):
  id, url = row
  response = requests.get(url)
  if response.status_code == 200:
      image_data = response.content
      base64image = base64.b64encode(image_data)
      return id, base64image
  else:
    return id, None

def update_db(results):
  for row in results:
    id, image = row
    if image:
      print("Inserting ", id)
      cursor.execute("""INSERT INTO LegosetImage (legosetid,image) VALUES(?, ?)""", (id, image))


num_rows = 200
half_point = num_rows // 2
quarter_point = half_point // 2

rows1 = rows[:quarter_point]
rows2 = rows[quarter_point:half_point]
rows3 = rows[half_point:half_point+quarter_point]
rows4 = rows[half_point+quarter_point:num_rows]


# This is multithreaded for when we want to load a large amount of images
with ThreadPoolExecutor(max_workers=4) as executor:
  r1 = executor.map(download_image, rows1)
  r2 = executor.map(download_image, rows2)
  r3 = executor.map(download_image, rows3)
  r4 = executor.map(download_image, rows4)

update_db(r1)
update_db(r2)
update_db(r3)
update_db(r4)
conn.commit()

conn.close()

import pandas as pd
import sys
# data = pd.read_csv("low_stv.csv")
csv = sys.argv[1]
data = pd.read_csv(csv)

link_pbody = {} # { post link : post body text }
link_title = {} # { post link : title }
questions_with_code = []
questions_with_links = []

attempt_signifying_words = ["attempt", "try", "tried", "tries"]
question_with_attempts = []

for i, row in data.iterrows():
    link, body, title = row[0],  row[3], row[4]
    link_pbody[link] = body
    link_title[link] = title
    if "<code>" in body:
        questions_with_code.append(link)
    if "<a href" in body:
        questions_with_links.append(link)
    for word in attempt_signifying_words:
        if word in body:
            question_with_attempts.append(link)
            break

print("\n" + "("+ str(len(questions_with_code)) +") "+ str(len(questions_with_code)/len(link_title)*100)[:2] + "% posts with code")
# for link in questions_with_code:
#     print(link, link_title[link])

print("\n" + "("+ str(len(questions_with_links)) +") "+ str(len(questions_with_links)/len(link_title)*100)[:2] + "% posts with links")
# for link in questions_with_links:
#     print(link, link_title[link])

print("\n" + "("+ str(len(question_with_attempts)) +") "+ str(len(question_with_attempts)/len(link_title)*100)[:2] + "% posts with attempts")
# for link in question_with_attempts:
    # print(link, link_title[link])

print()

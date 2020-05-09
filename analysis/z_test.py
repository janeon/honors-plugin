import pandas as pd
import math
import scipy.stats as st
# following z-test example found in https://stattrek.com/hypothesis-test/difference-in-proportions.aspx
# null hypothesis: PA <= PB

def main():
    high_ratio = pd.read_csv("high_sample.csv") # those with ratio > 0.13
    low_ratio = pd.read_csv("low_sample.csv") # those with ratio < -0.2
    print("high ratio sample size: ", len(high_ratio))
    print("low ratio sample size: ", len(low_ratio))
    # return

    multi_trait(high_ratio, low_ratio)
    body_lens = 0
    
    for i, row in high_ratio.iterrows():
        body_lens += len(row[4])
    print(body_lens/len(high_ratio))

    for i, row in low_ratio.iterrows():
        body_lens += len(row[4])
    print(body_lens/len(low_ratio))

def multi_trait(high_ratio, low_ratio):
    trials = 1000
    sample_size = min(len(high_ratio), len(low_ratio)) // 20

    print('Sample size', sample_size)
    print('Trial size', trials)
    traits = ['code', 'attempts','link', 'length']
    for trait in traits:
        p_sum = 0
        size = 0
        for i in range (trials):
            group_A = high_ratio.sample(n = sample_size)
            group_B = low_ratio.sample(n = sample_size)
            p_sum += z_test(group_A, group_B, trait)

        print('average p-value from two-proportion z-test on statistic', trait + ':', p_sum/trials)

def z_test(group_A, group_B, trait):
    med_body_size = 1350
    trait_dict = {'code':'<code>', 'link':'<a href'}
    if trait not in ['attempts', 'length']:
        trait = trait_dict[trait]

    pa, pb, lenA, lenB = 0, 0, len(group_A), len(group_B)

    for i, row in group_A.iterrows():
        body = row[4]
        if trait == 'attempts':
            pa += attempts(body)
        elif trait == 'length':
            pa += (len(body) > med_body_size)
        elif trait in body:
            pa += 1
    pa /= lenA

    for i, row in group_B.iterrows():
        body = row[4]
        if trait == 'attempts':
            pb += attempts(body)
        elif trait == 'length':
            pb += (len(body) > med_body_size)
        elif trait in body:
            pb += 1
    pb /= lenB

    # print('sample proportion for high-ratio sample', pa)
    # print('sample proportion for low-ratio sample', pb)

    # do two-proportion z-test on snippet presence
    p = (pa * lenA + pb * lenB) / (lenA + lenB)
    SE = math.sqrt(p * ( 1 - p ) * ((1/lenA) + (1/lenB)) )
    z = (pa - pb) / SE
    # print('z-value', z)

    final_prob = 1-st.norm.cdf(z)
    # print('p-value', final_prob)
    return final_prob

def attempts(body):
    attempt_signifying_words = ["attempt", "try", "tried", "tries"]
    for word in attempt_signifying_words:
        if word in body:
            return True
    return False

# calculate p value w/ a normal distribution calculator
if __name__ == "__main__":
    main()

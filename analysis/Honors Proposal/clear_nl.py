lines = open("claire_ps.txt","r")
newlines = "".join([ line.replace('/n', '') for line in lines ])

print(newlines)

# assuming the input is a list of articles sorted by date
# return a list of article list divided by month
# eg. [..., [article1 of 2015/7, article2 of 2015/7, ...], [article1 of 2015/6, ...], ...]
def listOfMonth(articlesList):
    myList = []
    year = None
    month = None
    for article in articlesList:
        tempYear = article.locale_date.split('/')[0]
        tempMonth = article.locale_date.split('/')[1]
        if tempYear == year and tempMonth == month:
            myList[len(myList) - 1].append(article)
        else:
            myList.append([article])
        year = tempYear
        month = tempMonth
    return myList

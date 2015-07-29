from myFilters import *
import unittest


class Article:
    def __init__(self, locale_date):
        self.locale_date = locale_date

    # def __repr__(self):
        # return self.__name__

    def getDate(self):
        return self.locale_date


class MyTest(unittest.TestCase):
    def test_listOfMonth(self):
        a1 = Article('2015/7/26')
        a2 = Article('2015/7/25')
        a3 = Article('2015/7/25')
        a4 = Article('2015/6/26')
        a5 = Article('2015/6/25')
        r = listOfMonth([a1, a2, a3, a4, a5])
        self.failUnlessEqual(r, [[a1, a2, a3], [a4, a5]])

    def test_sumByIndex(self):
        testList = [[2,3], [5,4,7], [1]]
        r0 = sumByIndex(testList, 0)
        self.failUnlessEqual(r0, 0)
        r1 = sumByIndex(testList, 1)
        self.failUnlessEqual(r1, 2)
        r2 = sumByIndex(testList, 3)
        self.failUnlessEqual(r2, 6)


if __name__== '__main__':
    unittest.main()

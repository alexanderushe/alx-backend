#!/usr/bin/env python3

"""Pagination"""

import csv
import math
from typing import Tuple, List


def index_range(page, page_size) -> Tuple[int, int]:
    """ calculates the start and end indicies of a given page and page size
    args:
        page: the page number
        page_size: number of items per page
    returns: a tuple
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)


class Server:

    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset of the baby name data
        returns a list of lists
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ retrieves a page of baby name data
            args: page - page number (1-indexed)
            returns:
            list of lists where each sublist represents a baby named record
        """
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        start, end = index_range(page, page_size)
        data = self.dataset()
        if start > len(data):
            return[]
        return data[start:end]

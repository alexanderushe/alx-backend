#!/usr/bin/env python3

"""Pagination function to calculate indices.
takes two arguments page & page_size and returns tuple
Args:
    page: the page number
    page_size: number of items per page
returns:
    tuple of two integers
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Pagination function to calculate indices.
    Calculates the start and end indices for a given page and page _size
    Returns:
    A tuple of two integers representing the start and end indices.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)

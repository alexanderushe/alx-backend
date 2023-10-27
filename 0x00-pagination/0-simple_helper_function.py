#!/usr/bin/env python3

"""Pagination function to calculate indices.
takes two arguments page & page_size and returns tuple
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)

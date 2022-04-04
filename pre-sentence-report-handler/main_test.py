import pytest
import main


def test_main():
    assert main.handler(None, None) == 'Hello World!'

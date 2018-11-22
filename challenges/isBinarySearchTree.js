const assert = require('assert')

/*
  Solve for these properties:

  - It's a tree, so it's a connected graph of nodes with no loops or cycles.
  - Since it's a binary tree, each node has (at most) two children
    (this.left and this.right point to these children).
  - Each node also has a value (in this case, this.value is an integer), and
    what specifically makes it a BST is the fact that for any given node, the
    left subtree contains only values less than the current node, while the right
    subtree only contains values greater than the current node.
*/
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
/*
            9
          /   \
         8     5
       /  \
      2    6
*/
function isBinarySearchTree (tree) {
  const traversal = []
  const traverse = ({ left, right, value }) => {
    if (left && right) {
      traverse(left)
      traversal.push(value)
      traverse(right)
    } else if (left && !right) {
      traverse(left)
      traversal.push(value)
    } else if (right && !left) {
      traversal.push(value)
      traverse(right)
    } else traversal.push(value)
  }

  traverse(tree)

  return traversal.every((n, i) => i === 0 || n > traversal[i - 1])
}

const makeTest = (t, x) => ({ t, x })

const tests = [
  makeTest({
    'value': 5,
    'left': {
      'value': 3,
      'left': {
        'value': 2,
        'left': null,
        'right': null
      },
      'right': null
    },
    'right': {
      'value': 8,
      'left': {
        'value': 6,
        'left': null,
        'right': null
      },
      'right': {
        'value': 9,
        'left': null,
        'right': null
      }
    }
  }, true),

  makeTest({
    'value': 9,
    'left': {
      'value': 8,
      'left': {
        'value': 2,
        'left': null,
        'right': null
      },
      'right': {
        'value': 6,
        'left': null,
        'right': null
      }
    },
    'right': {
      'value': 5,
      'left': null,
      'right': null
    }
  }, false),

  makeTest({
    'value': 1,
    'left': null,
    'right': {
      'value': 2,
      'left': null,
      'right': {
        'value': 3,
        'left': null,
        'right': {
          'value': 4,
          'left': null,
          'right': null
        }
      }
    }
  }, true),

  makeTest({
    'value': 1,
    'left': null,
    'right': {
      'value': 0,
      'left': null,
      'right': null
    }
  }, false),

  makeTest({
    'value': 1,
    'left': null,
    'right': null
  }, true),

  makeTest({
    'value': -95456,
    'left': {
      'value': 76751,
      'left': null,
      'right': null
    },
    'right': null
  }, false),

  makeTest({
    'value': -1,
    'left': {
      'value': -9,
      'left': {
        'value': -10,
        'left': null,
        'right': null
      },
      'right': null
    },
    'right': {
      'value': 3,
      'left': {
        'value': 1,
        'left': null,
        'right': null
      },
      'right': null
    }
  }, true),

  makeTest({
    'value': 79,
    'left': {
      'value': -56,
      'left': null,
      'right': null
    },
    'right': {
      'value': 0,
      'left': null,
      'right': {
        'value': -47,
        'left': {
          'value': -91,
          'left': null,
          'right': {
            'value': -92,
            'left': null,
            'right': null
          }
        },
        'right': {
          'value': -48,
          'left': {
            'value': 56,
            'left': null,
            'right': null
          },
          'right': {
            'value': 16,
            'left': null,
            'right': null
          }
        }
      }
    }
  }, false),

  makeTest({
    'value': -39,
    'left': {
      'value': -49,
      'left': {
        'value': -50,
        'left': null,
        'right': null
      },
      'right': null
    },
    'right': null
  }, true),

  makeTest({
    'value': -311163,
    'left': {
      'value': -466697,
      'left': {
        'value': -651198,
        'left': {
          'value': -922082,
          'left': {
            'value': -956138,
            'left': {
              'value': -978739,
              'left': null,
              'right': null
            },
            'right': null
          },
          'right': {
            'value': -896440,
            'left': {
              'value': -913494,
              'left': null,
              'right': null
            },
            'right': {
              'value': -825506,
              'left': null,
              'right': {
                'value': -711270,
                'left': {
                  'value': -727057,
                  'left': {
                    'value': -728046,
                    'left': null,
                    'right': null
                  },
                  'right': null
                },
                'right': {
                  'value': -670927,
                  'left': {
                    'value': -685464,
                    'left': null,
                    'right': null
                  },
                  'right': null
                }
              }
            }
          }
        },
        'right': {
          'value': -480771,
          'left': {
            'value': -589460,
            'left': null,
            'right': null
          },
          'right': null
        }
      },
      'right': {
        'value': -355670,
        'left': {
          'value': -451394,
          'left': null,
          'right': {
            'value': -404060,
            'left': null,
            'right': null
          }
        },
        'right': null
      }
    },
    'right': {
      'value': 146712,
      'left': {
        'value': 23556,
        'left': {
          'value': -125630,
          'left': {
            'value': -298932,
            'left': null,
            'right': {
              'value': -173360,
              'left': null,
              'right': null
            }
          },
          'right': {
            'value': -114640,
            'left': null,
            'right': {
              'value': -71829,
              'left': {
                'value': -86272,
                'left': {
                  'value': -86915,
                  'left': {
                    'value': -113982,
                    'left': null,
                    'right': null
                  },
                  'right': null
                },
                'right': null
              },
              'right': null
            }
          }
        },
        'right': {
          'value': 131800,
          'left': null,
          'right': null
        }
      },
      'right': {
        'value': 427724,
        'left': {
          'value': 190515,
          'left': {
            'value': 170005,
            'left': null,
            'right': null
          },
          'right': {
            'value': 243568,
            'left': {
              'value': 367251,
              'left': null,
              'right': null
            },
            'right': {
              'value': 252743,
              'left': null,
              'right': null
            }
          }
        },
        'right': {
          'value': 701537,
          'left': {
            'value': 626443,
            'left': {
              'value': 591298,
              'left': {
                'value': 539464,
                'left': null,
                'right': null
              },
              'right': null
            },
            'right': null
          },
          'right': {
            'value': 941633,
            'left': {
              'value': 849041,
              'left': {
                'value': 727174,
                'left': null,
                'right': {
                  'value': 838850,
                  'left': null,
                  'right': null
                }
              },
              'right': {
                'value': 928249,
                'left': {
                  'value': 884546,
                  'left': {
                    'value': 877162,
                    'left': null,
                    'right': null
                  },
                  'right': null
                },
                'right': null
              }
            },
            'right': {
              'value': 996381,
              'left': {
                'value': 979451,
                'left': null,
                'right': null
              },
              'right': null
            }
          }
        }
      }
    }
  }, false),

  makeTest(
    {
      'value': 96,
      'left': null,
      'right': {
        'value': 77,
        'left': {
          'value': 74,
          'left': null,
          'right': {
            'value': 85,
            'left': {
              'value': -99,
              'left': null,
              'right': null
            },
            'right': {
              'value': 95,
              'left': null,
              'right': null
            }
          }
        },
        'right': null
      }
    }, false
  ),

  makeTest({
    'value': 0,
    'left': {
      'value': -99,
      'left': {
        'value': -500,
        'left': null,
        'right': null
      },
      'right': null
    },
    'right': null
  }, true),

  makeTest({
    'value': -8,
    'left': {
      'value': -35,
      'left': null,
      'right': null
    },
    'right': {
      'value': 17,
      'left': {
        'value': 8,
        'left': {
          'value': -7,
          'left': null,
          'right': {
            'value': -6,
            'left': null,
            'right': {
              'value': 1,
              'left': {
                'value': -2,
                'left': {
                  'value': -5,
                  'left': null,
                  'right': null
                },
                'right': {
                  'value': -1,
                  'left': null,
                  'right': null
                }
              },
              'right': {
                'value': 4,
                'left': {
                  'value': 2,
                  'left': null,
                  'right': null
                },
                'right': {
                  'value': 6,
                  'left': null,
                  'right': {
                    'value': 7,
                    'left': null,
                    'right': null
                  }
                }
              }
            }
          }
        },
        'right': null
      },
      'right': null
    }
  }, true),

  makeTest({
    'value': 205460,
    'left': {
      'value': 186165,
      'left': null,
      'right': {
        'value': 188457,
        'left': {
          'value': 188306,
          'left': {
            'value': 187006,
            'left': {
              'value': 186548,
              'left': null,
              'right': null
            },
            'right': null
          },
          'right': {
            'value': 188351,
            'left': {
              'value': 188316,
              'left': {
                'value': 188308,
                'left': {
                  'value': 188307,
                  'left': null,
                  'right': null
                },
                'right': null
              },
              'right': {
                'value': 188347,
                'left': {
                  'value': 188331,
                  'left': null,
                  'right': null
                },
                'right': {
                  'value': 188348,
                  'left': null,
                  'right': {
                    'value': 188349,
                    'left': null,
                    'right': null
                  }
                }
              }
            },
            'right': {
              'value': 188434,
              'left': {
                'value': 188429,
                'left': {
                  'value': 188361,
                  'left': null,
                  'right': null
                },
                'right': {
                  'value': 188432,
                  'left': {
                    'value': 188430,
                    'left': null,
                    'right': {
                      'value': 188431,
                      'left': null,
                      'right': null
                    }
                  },
                  'right': null
                }
              },
              'right': {
                'value': 188447,
                'left': null,
                'right': null
              }
            }
          }
        },
        'right': null
      }
    },
    'right': null
  }, true),

  makeTest({
    'value': -87316,
    'left': {
      'value': 225,
      'left': null,
      'right': {
        'value': 44317,
        'left': {
          'value': -79355,
          'left': {
            'value': 67567,
            'left': null,
            'right': {
              'value': 12246,
              'left': {
                'value': 68229,
                'left': null,
                'right': null
              },
              'right': null
            }
          },
          'right': null
        },
        'right': null
      }
    },
    'right': {
      'value': 37541,
      'left': {
        'value': 61700,
        'left': null,
        'right': {
          'value': 85241,
          'left': {
            'value': -53,
            'left': null,
            'right': {
              'value': 85823,
              'left': {
                'value': -22721,
                'left': null,
                'right': null
              },
              'right': {
                'value': 82795,
                'left': {
                  'value': -73028,
                  'left': {
                    'value': 73433,
                    'left': null,
                    'right': {
                      'value': 52379,
                      'left': null,
                      'right': null
                    }
                  },
                  'right': {
                    'value': -12002,
                    'left': {
                      'value': -81818,
                      'left': {
                        'value': 28965,
                        'left': null,
                        'right': null
                      },
                      'right': {
                        'value': 85714,
                        'left': null,
                        'right': null
                      }
                    },
                    'right': {
                      'value': 39334,
                      'left': null,
                      'right': {
                        'value': 32111,
                        'left': null,
                        'right': null
                      }
                    }
                  }
                },
                'right': null
              }
            }
          },
          'right': null
        }
      },
      'right': {
        'value': 71665,
        'left': {
          'value': 47083,
          'left': {
            'value': 37154,
            'left': {
              'value': 17263,
              'left': null,
              'right': null
            },
            'right': {
              'value': -18646,
              'left': {
                'value': 10053,
                'left': {
                  'value': -51732,
                  'left': {
                    'value': -73110,
                    'left': {
                      'value': -2251,
                      'left': {
                        'value': -67359,
                        'left': null,
                        'right': null
                      },
                      'right': {
                        'value': -22535,
                        'left': null,
                        'right': null
                      }
                    },
                    'right': {
                      'value': 88445,
                      'left': null,
                      'right': {
                        'value': -13162,
                        'left': null,
                        'right': null
                      }
                    }
                  },
                  'right': {
                    'value': 11590,
                    'left': null,
                    'right': {
                      'value': -70157,
                      'left': {
                        'value': -21979,
                        'left': null,
                        'right': null
                      },
                      'right': {
                        'value': -50375,
                        'left': null,
                        'right': null
                      }
                    }
                  }
                },
                'right': {
                  'value': 71626,
                  'left': {
                    'value': 12958,
                    'left': null,
                    'right': {
                      'value': 68305,
                      'left': null,
                      'right': {
                        'value': 80016,
                        'left': null,
                        'right': null
                      }
                    }
                  },
                  'right': {
                    'value': 41702,
                    'left': {
                      'value': -33139,
                      'left': {
                        'value': 74546,
                        'left': null,
                        'right': null
                      },
                      'right': null
                    },
                    'right': {
                      'value': -94971,
                      'left': null,
                      'right': null
                    }
                  }
                }
              },
              'right': null
            }
          },
          'right': {
            'value': -39236,
            'left': null,
            'right': {
              'value': 52793,
              'left': null,
              'right': null
            }
          }
        },
        'right': {
          'value': -32116,
          'left': {
            'value': -42862,
            'left': null,
            'right': {
              'value': -20799,
              'left': null,
              'right': {
                'value': -93046,
                'left': {
                  'value': 58865,
                  'left': {
                    'value': -93476,
                    'left': null,
                    'right': null
                  },
                  'right': null
                },
                'right': null
              }
            }
          },
          'right': null
        }
      }
    }
  }, false),

  /*
              5
             / \
           2    7
          / \  / \
         1   6 4  9
   */
  // 1, 2, 6, 5, 7, 4, 9
  makeTest({
    'value': 5,
    'left': {
      'value': 2,
      'left': {
        'value': 1,
        'left': null,
        'right': null
      },
      'right': {
        'value': 6,
        'left': null,
        'right': null
      }
    },
    'right': {
      'value': 7,
      'left': {
        'value': 4,
        'left': null,
        'right': null
      },
      'right': {
        'value': 9,
        'left': null,
        'right': null
      }
    }
  }, false),

  makeTest({
    'value': 1,
    'left': {
      'value': 1,
      'left': null,
      'right': null
    },
    'right': {
      'value': 2,
      'left': null,
      'right': null
    }
  }, false),

  makeTest({
    'value': 27,
    'left': {
      'value': 24,
      'left': {
        'value': -21,
        'left': {
          'value': -29,
          'left': {
            'value': -86,
            'left': {
              'value': -98,
              'left': {
                'value': -99,
                'left': null,
                'right': null
              },
              'right': {
                'value': -96,
                'left': null,
                'right': {
                  'value': -89,
                  'left': null,
                  'right': null
                }
              }
            },
            'right': {
              'value': -98,
              'left': null,
              'right': {
                'value': -42,
                'left': {
                  'value': -84,
                  'left': {
                    'value': -85,
                    'left': null,
                    'right': null
                  },
                  'right': {
                    'value': -72,
                    'left': {
                      'value': -75,
                      'left': {
                        'value': -83,
                        'left': null,
                        'right': {
                          'value': -77,
                          'left': null,
                          'right': null
                        }
                      },
                      'right': null
                    },
                    'right': {
                      'value': -79,
                      'left': null,
                      'right': {
                        'value': -53,
                        'left': {
                          'value': -55,
                          'left': {
                            'value': -67,
                            'left': null,
                            'right': {
                              'value': -66,
                              'left': null,
                              'right': {
                                'value': -58,
                                'left': null,
                                'right': null
                              }
                            }
                          },
                          'right': null
                        },
                        'right': {
                          'value': -62,
                          'left': null,
                          'right': {
                            'value': -46,
                            'left': {
                              'value': -48,
                              'left': null,
                              'right': null
                            },
                            'right': null
                          }
                        }
                      }
                    }
                  }
                },
                'right': {
                  'value': -33,
                  'left': {
                    'value': -39,
                    'left': null,
                    'right': null
                  },
                  'right': null
                }
              }
            }
          },
          'right': {
            'value': -65,
            'left': null,
            'right': {
              'value': -25,
              'left': null,
              'right': {
                'value': -22,
                'left': {
                  'value': -24,
                  'left': null,
                  'right': null
                },
                'right': null
              }
            }
          }
        },
        'right': {
          'value': -14,
          'left': {
            'value': -20,
            'left': null,
            'right': null
          },
          'right': {
            'value': -8,
            'left': {
              'value': -12,
              'left': null,
              'right': {
                'value': -10,
                'left': null,
                'right': null
              }
            },
            'right': {
              'value': 1,
              'left': {
                'value': -5,
                'left': null,
                'right': {
                  'value': -4,
                  'left': null,
                  'right': {
                    'value': -2,
                    'left': null,
                    'right': null
                  }
                }
              },
              'right': {
                'value': 8,
                'left': {
                  'value': 6,
                  'left': {
                    'value': 3,
                    'left': null,
                    'right': null
                  },
                  'right': {
                    'value': 7,
                    'left': null,
                    'right': null
                  }
                },
                'right': {
                  'value': 17,
                  'left': {
                    'value': 14,
                    'left': null,
                    'right': null
                  },
                  'right': null
                }
              }
            }
          }
        }
      },
      'right': {
        'value': 26,
        'left': {
          'value': 25,
          'left': null,
          'right': null
        },
        'right': null
      }
    },
    'right': {
      'value': 42,
      'left': {
        'value': 35,
        'left': {
          'value': 32,
          'left': {
            'value': 31,
            'left': null,
            'right': null
          },
          'right': {
            'value': 33,
            'left': null,
            'right': null
          }
        },
        'right': {
          'value': 40,
          'left': {
            'value': 38,
            'left': {
              'value': 37,
              'left': {
                'value': 36,
                'left': null,
                'right': null
              },
              'right': null
            },
            'right': null
          },
          'right': null
        }
      },
      'right': {
        'value': 57,
        'left': {
          'value': 54,
          'left': {
            'value': 50,
            'left': {
              'value': 49,
              'left': null,
              'right': null
            },
            'right': null
          },
          'right': null
        },
        'right': {
          'value': 69,
          'left': {
            'value': 67,
            'left': {
              'value': 64,
              'left': null,
              'right': null
            },
            'right': null
          },
          'right': {
            'value': 88,
            'left': {
              'value': 82,
              'left': {
                'value': 75,
                'left': {
                  'value': 71,
                  'left': null,
                  'right': null
                },
                'right': {
                  'value': 76,
                  'left': null,
                  'right': null
                }
              },
              'right': {
                'value': 86,
                'left': {
                  'value': 83,
                  'left': null,
                  'right': null
                },
                'right': {
                  'value': 87,
                  'left': null,
                  'right': null
                }
              }
            },
            'right': {
              'value': 99,
              'left': {
                'value': 91,
                'left': null,
                'right': null
              },
              'right': null
            }
          }
        }
      }
    }
  }, false)
]

// tests.forEach(t => assert.strictEqual(isBinarySearchTree(t.t), t.x))
tests.forEach((t, i) => {
  console.log('i', i)
  assert.strictEqual(isBinarySearchTree(t.t), t.x)
})

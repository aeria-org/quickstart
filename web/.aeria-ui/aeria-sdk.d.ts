import type {
  InferProperty,
  InferProperties,
  SchemaWithId,
  PackReferences,
  RequestMethod,
  CollectionFunctionsSDK

} from '@aeriajs/types'

declare type MirrorDescriptions = {
  "file": {
    "$id": "file",
    "icon": "paperclip",
    "owned": "always",
    "presets": [
      "owned"
    ],
    "indexes": [
      "name",
      "link",
      "type",
      "size"
    ],
    "properties": {
      "type": {
        "type": "string"
      },
      "size": {
        "type": "number"
      },
      "last_modified": {
        "type": "string",
        "format": "date-time"
      },
      "name": {
        "type": "string"
      },
      "absolute_path": {
        "type": "string"
      },
      "relative_path": {
        "type": "string"
      },
      "immutable": {
        "type": "boolean"
      },
      "link": {
        "type": "getter",
        "readOnly": true
      },
      "download_link": {
        "type": "getter",
        "readOnly": true
      },
      "owner": {
        "$ref": "user",
        "noForm": true,
        "indexes": [
          "name"
        ]
      },
      "created_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      },
      "updated_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      }
    },
    "actions": {
      "deleteAll": {
        "label": "Remover",
        "ask": true,
        "selection": true
      }
    },
    "individualActions": {
      "remove": {
        "label": "Remover",
        "icon": "trash",
        "ask": true
      }
    }
  },
  "log": {
    "$id": "log",
    "icon": "magnifying-glass",
    "required": [
      "context",
      "message"
    ],
    "table": [
      "owner",
      "context",
      "message",
      "created_at"
    ],
    "properties": {
      "owner": {
        "$ref": "user",
        "noForm": true,
        "indexes": [
          "name"
        ]
      },
      "context": {
        "type": "string"
      },
      "message": {
        "type": "string"
      },
      "details": {
        "type": "object",
        "additionalProperties": true
      },
      "created_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      },
      "updated_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      }
    },
    "presets": [
      "view"
    ],
    "filters": [
      "context",
      "message",
      "owner"
    ],
    "individualActions": {
      "viewItem": {
        "label": "action.view",
        "icon": "eye",
        "translate": true,
        "route": {
          "name": "/dashboard/:collection/:id",
          "setItem": true
        }
      }
    }
  },
  "resourceUsage": {
    "$id": "resourceUsage",
    "icon": "wrench",
    "required": [
      "usage"
    ],
    "properties": {
      "user": {
        "$ref": "user",
        "indexes": [
          "name"
        ]
      },
      "address": {
        "type": "string"
      },
      "usage": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "hits": {
              "type": "integer"
            },
            "points": {
              "type": "integer"
            },
            "last_reach": {
              "type": "string",
              "format": "date-time"
            },
            "last_maximum_reach": {
              "type": "string",
              "format": "date-time"
            }
          }
        }
      },
      "created_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      },
      "updated_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      }
    }
  },
  "tempFile": {
    "$id": "tempFile",
    "icon": "file",
    "hidden": true,
    "temporary": {
      "index": "created_at",
      "expireAfterSeconds": 3600
    },
    "properties": {
      "created_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      },
      "absolute_path": {
        "type": "string"
      },
      "size": {
        "type": "number"
      },
      "mime": {
        "type": "number"
      },
      "collection": {
        "type": "string"
      },
      "filename": {
        "type": "string"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      }
    }
  },
  "user": {
    "$id": "user",
    "icon": "users",
    "required": [
      "name",
      "roles",
      "email"
    ],
    "form": [
      "name",
      "active",
      "roles",
      "email",
      "phone_number",
      "picture_file"
    ],
    "indexes": [
      "name"
    ],
    "unique": [
      "email"
    ],
    "properties": {
      "name": {
        "type": "string",
        "minLength": 1
      },
      "given_name": {
        "type": "getter",
        "readOnly": true
      },
      "family_name": {
        "type": "getter",
        "readOnly": true
      },
      "active": {
        "type": "boolean"
      },
      "roles": {
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "root",
            "customer"
          ]
        },
        "uniqueItems": true,
        "minItems": 1,
        "maxItems": 1
      },
      "email": {
        "type": "string",
        "inputType": "email",
        "minLength": 3
      },
      "password": {
        "type": "string",
        "inputType": "password",
        "hidden": true
      },
      "phone_number": {
        "type": "string",
        "mask": "(##) #####-####"
      },
      "picture_file": {
        "$ref": "file",
        "accept": [
          "image/*"
        ],
        "indexes": [
          "name",
          "link",
          "type",
          "size"
        ]
      },
      "picture": {
        "type": "getter",
        "readOnly": true
      },
      "self_registered": {
        "type": "boolean",
        "readOnly": true
      },
      "updated_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      },
      "created_at": {
        "type": "string",
        "format": "date-time",
        "noForm": true,
        "readOnly": true,
        "isTimestamp": true
      }
    },
    "presets": [
      "crud",
      "duplicate"
    ],
    "layout": {
      "name": "grid",
      "options": {
        "title": "name",
        "badge": "roles",
        "picture": "picture_file",
        "information": "email",
        "active": "active",
        "translateBadge": true
      }
    },
    "individualActions": {
      "changePassword": {
        "label": "change_password",
        "icon": "key",
        "translate": true,
        "route": {
          "name": "/dashboard/user/changepass",
          "fetchItem": true
        }
      },
      "copyRedefinePasswordLink": {
        "label": "copy_redefine_password_link",
        "icon": "link",
        "translate": true
      },
      "copyActivationLink": {
        "label": "copy_activation_link",
        "icon": "link",
        "translate": true
      },
      "spawnEdit": {
        "label": "action.edit",
        "event": "spawnEdit",
        "icon": "pencil-simple",
        "translate": true
      },
      "viewItem": {
        "label": "action.view",
        "icon": "eye",
        "translate": true,
        "route": {
          "name": "/dashboard/:collection/:id",
          "setItem": true
        }
      },
      "remove": {
        "label": "action.remove",
        "icon": "trash",
        "ask": true,
        "translate": true
      },
      "duplicate": {
        "label": "action.duplicate",
        "event": "duplicate",
        "icon": "copy",
        "translate": true
      }
    },
    "filters": [
      "name",
      "roles",
      "email",
      "phone_number"
    ],
    "table": [
      "name",
      "roles",
      "picture_file",
      "active",
      "updated_at"
    ],
    "tableMeta": [
      "email"
    ],
    "formLayout": {
      "fields": {
        "given_name": {
          "span": 3
        },
        "family_name": {
          "span": 3
        }
      }
    },
    "actions": {
      "spawnAdd": {
        "label": "action.add",
        "event": "spawnAdd",
        "icon": "plus",
        "button": true,
        "translate": true
      }
    }
  }
}


declare type MirrorApiSchema = {
  "/file/get": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/file/insert": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/file/download": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "payload": {
        "type": "object",
        "required": [
          "fileId"
        ],
        "properties": {
          "fileId": {
            "type": "string"
          },
          "options": {
            "type": "array",
            "items": {
              "enum": [
                "picture",
                "download"
              ]
            }
          },
          "noHeaders": {
            "type": "boolean"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    404,
                    416
                  ]
                },
                "code": {
                  "enum": [
                    "RESOURCE_NOT_FOUND",
                    "RANGE_NOT_SATISFIABLE"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "additionalProperties": true
        }
      ]
    }
  },
  "/file/remove": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/file/removeAll": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/log/get": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/log/getAll": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/log/insert": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/user/get": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/user/getAll": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/user/remove": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/user/upload": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/user/removeFile": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "builtin": true
    }
  },
  "/user/insert": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/user/editProfile": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "payload": {
        "type": "object",
        "required": [],
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "given_name": {
            "type": "getter"
          },
          "family_name": {
            "type": "getter"
          },
          "active": {
            "type": "boolean"
          },
          "roles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "uniqueItems": true,
            "minItems": 1
          },
          "email": {
            "type": "string",
            "inputType": "email",
            "minLength": 3
          },
          "password": {
            "type": "string",
            "inputType": "password",
            "hidden": true
          },
          "phone_number": {
            "type": "string",
            "mask": "(##) #####-####"
          },
          "picture_file": {
            "type": "string",
            "format": "objectid"
          },
          "picture": {
            "type": "getter"
          },
          "self_registered": {
            "type": "boolean",
            "readOnly": true
          },
          "updated_at": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    403,
                    404,
                    422,
                    400,
                    500
                  ]
                },
                "code": {
                  "enum": [
                    "INSECURE_OPERATOR",
                    "OWNERSHIP_ERROR",
                    "RESOURCE_NOT_FOUND",
                    "TARGET_IMMUTABLE",
                    "MALFORMED_INPUT",
                    "UNIQUENESS_VIOLATED",
                    "EMPTY_TARGET",
                    "INVALID_PROPERTIES",
                    "MISSING_PROPERTIES",
                    "INVALID_DOCUMENT_ID",
                    "INVALID_TEMPFILE"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "$ref": "user"
            }
          }
        }
      ]
    }
  },
  "/user/authenticate": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "payload": {
        "type": "object",
        "required": [],
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "revalidate": {
            "type": "boolean"
          },
          "token": {
            "type": "object",
            "properties": {
              "type": {
                "enum": [
                  "bearer"
                ]
              },
              "content": {
                "type": "string"
              }
            }
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    401
                  ]
                },
                "code": {
                  "enum": [
                    "AUTHORIZATION_ERROR",
                    "INVALID_CREDENTIALS",
                    "INACTIVE_USER"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "properties": {
                "user": {
                  "$ref": "user"
                },
                "token": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "enum": [
                        "bearer"
                      ]
                    },
                    "content": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "properties": {
                "user": {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "const": null
                    },
                    "name": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string"
                    },
                    "roles": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "active": {
                      "type": "boolean"
                    }
                  }
                },
                "token": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string"
                    },
                    "content": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      ]
    }
  },
  "/user/activate": {
    "POST": {
      "roles": [
        "unauthenticated",
        "root"
      ],
      "payload": {
        "type": "object",
        "required": [],
        "properties": {
          "password": {
            "type": "string"
          },
          "userId": {
            "type": "string"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    404,
                    403,
                    401,
                    422
                  ]
                },
                "code": {
                  "enum": [
                    "RESOURCE_NOT_FOUND",
                    "MALFORMED_INPUT",
                    "ALREADY_ACTIVE_USER",
                    "INVALID_LINK",
                    "INVALID_TOKEN",
                    "USER_NOT_FOUND"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "properties": {
                "userId": {
                  "type": "string",
                  "format": "objectid"
                }
              }
            }
          }
        }
      ]
    }
  },
  "/user/createAccount": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "payload": {
        "type": "object",
        "required": [],
        "additionalProperties": true,
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "given_name": {
            "type": "getter"
          },
          "family_name": {
            "type": "getter"
          },
          "active": {
            "type": "boolean"
          },
          "roles": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "uniqueItems": true,
            "minItems": 1
          },
          "email": {
            "type": "string",
            "inputType": "email",
            "minLength": 3
          },
          "password": {
            "type": "string",
            "inputType": "password",
            "hidden": true
          },
          "phone_number": {
            "type": "string",
            "mask": "(##) #####-####"
          },
          "picture_file": {
            "$ref": "file",
            "accept": [
              "image/*"
            ]
          },
          "picture": {
            "type": "getter"
          },
          "self_registered": {
            "type": "boolean",
            "readOnly": true
          },
          "updated_at": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    403,
                    404,
                    422,
                    400,
                    500
                  ]
                },
                "code": {
                  "enum": [
                    "INSECURE_OPERATOR",
                    "OWNERSHIP_ERROR",
                    "RESOURCE_NOT_FOUND",
                    "TARGET_IMMUTABLE",
                    "MALFORMED_INPUT",
                    "UNIQUENESS_VIOLATED",
                    "EMPTY_TARGET",
                    "INVALID_PROPERTIES",
                    "MISSING_PROPERTIES",
                    "INVALID_DOCUMENT_ID",
                    "INVALID_TEMPFILE"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    403,
                    422
                  ]
                },
                "code": {
                  "enum": [
                    "MALFORMED_INPUT",
                    "OWNERSHIP_ERROR",
                    "SIGNUP_DISALLOWED"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "$ref": "user"
            }
          }
        }
      ]
    }
  },
  "/user/getInfo": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "payload": {
        "type": "object",
        "required": [],
        "properties": {
          "userId": {
            "type": "string"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    404,
                    401,
                    422
                  ]
                },
                "code": {
                  "enum": [
                    "INVALID_LINK",
                    "INVALID_TOKEN",
                    "USER_NOT_FOUND"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "required": [
                "name",
                "email"
              ],
              "properties": {
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "active": {
                  "type": "boolean"
                }
              }
            }
          }
        }
      ]
    }
  },
  "/user/getCurrentUser": {
    "POST": {
      "roles": [
        "root",
        "customer"
      ],
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "$ref": "user"
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "properties": {
                "_id": {
                  "const": null
                },
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "roles": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "active": {
                  "type": "boolean"
                }
              }
            }
          }
        }
      ]
    }
  },
  "/user/getActivationLink": {
    "POST": {
      "roles": [
        "root"
      ],
      "payload": {
        "type": "object",
        "required": [
          "userId"
        ],
        "properties": {
          "userId": {
            "type": "string",
            "format": "objectid"
          },
          "redirect": {
            "type": "string"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    403,
                    404,
                    400
                  ]
                },
                "code": {
                  "enum": [
                    "RESOURCE_NOT_FOUND",
                    "OWNERSHIP_ERROR",
                    "INSECURE_OPERATOR",
                    "MALFORMED_INPUT"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    400,
                    403
                  ]
                },
                "code": {
                  "enum": [
                    "INVALID_LINK",
                    "ALREADY_ACTIVE_USER"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string"
                }
              }
            }
          }
        }
      ]
    }
  },
  "/user/getRedefinePasswordLink": {
    "POST": {
      "roles": [
        "root"
      ],
      "payload": {
        "type": "object",
        "required": [
          "userId"
        ],
        "properties": {
          "userId": {
            "type": "string",
            "format": "objectid"
          },
          "redirect": {
            "type": "string"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    403,
                    404,
                    400
                  ]
                },
                "code": {
                  "enum": [
                    "RESOURCE_NOT_FOUND",
                    "OWNERSHIP_ERROR",
                    "INSECURE_OPERATOR",
                    "MALFORMED_INPUT"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    403
                  ]
                },
                "code": {
                  "enum": [
                    "USER_NOT_ACTIVE"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string"
                }
              }
            }
          }
        }
      ]
    }
  },
  "/user/redefinePassword": {
    "POST": {
      "roles": [
        "unauthenticated",
        "root"
      ],
      "payload": {
        "type": "object",
        "required": [],
        "properties": {
          "userId": {
            "type": "string",
            "format": "objectid"
          },
          "password": {
            "type": "string"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    403,
                    404,
                    400
                  ]
                },
                "code": {
                  "enum": [
                    "RESOURCE_NOT_FOUND",
                    "OWNERSHIP_ERROR",
                    "INSECURE_OPERATOR",
                    "MALFORMED_INPUT"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "result": {
              "isConstUndefined": true
            },
            "error": {
              "type": "object",
              "required": [
                "httpStatus",
                "code"
              ],
              "properties": {
                "httpStatus": {
                  "enum": [
                    404,
                    403,
                    401,
                    422
                  ]
                },
                "code": {
                  "enum": [
                    "MALFORMED_INPUT",
                    "INVALID_LINK",
                    "INVALID_TOKEN",
                    "USER_NOT_FOUND",
                    "USER_NOT_ACTIVE"
                  ]
                },
                "message": {
                  "type": "string"
                },
                "details": {
                  "type": "object",
                  "additionalProperties": true
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {
              "isConstUndefined": true
            },
            "result": {
              "type": "object",
              "properties": {
                "userId": {
                  "type": "string",
                  "format": "objectid"
                }
              }
            }
          }
        }
      ]
    }
  }
}


declare global {
  type Collections = {
    [K in keyof MirrorDescriptions]: {
      item: SchemaWithId<MirrorDescriptions[K], { useObjectIds: false }>
    }
  }
}

declare module 'aeria-sdk' {
  import { AeriaInstance, MakeEndpoint, ApiSchema } from 'aeria-sdk'

  type UnionToIntersection<T> = (T extends unknown ? ((x: T) => 0) : never) extends ((x: infer R) => 0)
    ? R
    : never

  type InferEndpoints<TApiSchema extends ApiSchema, TRoute extends keyof TApiSchema & string> = {
    [Method in keyof TApiSchema[TRoute]]: Method extends RequestMethod
      ? TApiSchema[TRoute][Method] extends infer Contract
        ? Contract extends
        | { response: infer RouteResponse }
        | { payload: infer RoutePayload  }
        | { query: infer RoutePayload  }
          ? MakeEndpoint<
            TRoute,
            Method,
            InferProperties<RouteResponse, { useObjectIds: false }>,
            RoutePayload extends {}
              ? PackReferences<InferProperty<RoutePayload, { useObjectIds: false }>>
              : undefined
          >
          : MakeEndpoint<TRoute, Method>
        : never
      : never
    } extends infer Methods
      ? Methods[keyof Methods]
      : never

  export type Api = {
    [Route in keyof MirrorApiSchema]: Route extends `/${infer Coll}/${infer Fn}`
      ? Coll extends keyof Collections
        ? Fn extends keyof CollectionFunctionsSDK
          ? Record<Coll, Record<
              Fn, {
              POST: CollectionFunctionsSDK<MirrorDescriptions[Coll]>[Fn]
            }
            >>
          : InferEndpoints<MirrorApiSchema, Route>
        : InferEndpoints<MirrorApiSchema, Route>
      : InferEndpoints<MirrorApiSchema, Route>
  } extends infer Api
    ? UnionToIntersection<Api[keyof Api]>
    : never

  type TopLevelAeria = 
    & ((bearerToken?: string) => AeriaInstance & Api)
    & AeriaInstance & Api

  const topLevelAeria: TopLevelAeria

  export {
    MirrorDescriptions,
    MirrorApiSchema,
  }

  export const url: string
  export const aeria: TopLevelAeria
  export default topLevelAeria
}


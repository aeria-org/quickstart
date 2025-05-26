import type {
  InferProperty,
  InferProperties,
  SchemaWithId,
  PackReferences,
  MakeEndpoint,
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
        "readOnly": true
      },
      "download_link": {
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
  "pet": {
    "$id": "pet",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "number"
      },
      "breed": {
        "type": "string"
      },
      "root_user": {
        "$ref": "user",
        "constraints": {
          "operator": "in",
          "term1": "roles",
          "term2": "root"
        },
        "indexes": [
          "name"
        ]
      },
      "pic": {
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
    "required": {
      "name": {
        "operator": "gt",
        "term1": "age",
        "term2": 10
      },
      "breed": {
        "or": [
          {
            "operator": "equal",
            "term1": "name",
            "term2": "thor"
          },
          {
            "operator": "equal",
            "term1": "name",
            "term2": "bobby"
          }
        ]
      },
      "age": true
    },
    "filters": [
      "name"
    ],
    "presets": [
      "crud"
    ],
    "formLayout": {
      "fields": {
        "age": {
          "span": 3
        },
        "breed": {
          "if": {
            "or": [
              {
                "operator": "equal",
                "term1": "name",
                "term2": "thor"
              },
              {
                "operator": "equal",
                "term1": "name",
                "term2": "bobby"
              }
            ]
          },
          "span": 3
        }
      }
    },
    "layout": {
      "name": "grid",
      "options": {
        "title": "name",
        "picture": "pic",
        "information": [
          "name",
          "breed",
          "age",
          "age"
        ],
        "badge": "breed"
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
    },
    "individualActions": {
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
        "readOnly": true
      },
      "family_name": {
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


declare type MirrorRouter = {
  "/file/get": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/file/insert": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/file/download": {
    "POST": {
      "roles": [
        "root"
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
            "result": {},
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
        "root"
      ],
      "builtin": true
    }
  },
  "/file/removeAll": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/pet/get": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/pet/getAll": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/pet/insert": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/pet/remove": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/pet/upload": {
    "POST": {
      "roles": [
        "root"
      ],
      "builtin": true
    }
  },
  "/user/get": {
    "POST": {
      "roles": [
        "root"
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
        "root"
      ],
      "builtin": true
    }
  },
  "/user/removeFile": {
    "POST": {
      "roles": [
        "root"
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
        "root"
      ],
      "payload": {
        "type": "object",
        "required": [],
        "properties": {
          "name": {
            "type": "string",
            "minLength": 1
          },
          "given_name": {},
          "family_name": {},
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
          "picture": {},
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
            "result": {},
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
            "error": {},
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
        "root"
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
            "result": {},
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
            "error": {},
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
            "error": {},
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
            "result": {},
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
            "error": {},
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
        "root"
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
          "given_name": {},
          "family_name": {},
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
          "picture": {},
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
            "result": {},
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
            "result": {},
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
            "error": {},
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
        "root"
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
            "result": {},
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
            "error": {},
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
        "root"
      ],
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {},
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
            "error": {},
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
            "result": {},
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
            "result": {},
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
            "error": {},
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
            "result": {},
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
            "result": {},
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
            "error": {},
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
            "result": {},
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
            "result": {},
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
            "error": {},
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
  "/user/getBySlug": {
    "GET": {
      "query": {
        "type": "object",
        "properties": {
          "slug": {
            "$ref": "user",
            "constraints": {
              "operator": "in",
              "term1": "roles",
              "term2": "root"
            }
          }
        }
      },
      "response": [
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Result"
            },
            "error": {},
            "result": {
              "$ref": "user"
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "_tag": {
              "const": "Error"
            },
            "error": {
              "type": "object",
              "properties": {
                "httpStatus": {
                  "enum": [
                    404
                  ]
                },
                "code": {
                  "enum": [
                    "RESOURCE_NOT_FOUND"
                  ]
                }
              }
            },
            "result": {}
          }
        }
      ]
    }
  }
}


declare global {
  type Collections = {
    [K in keyof MirrorDescriptions]: {
      item: SchemaWithId<MirrorDescriptions[K]>
    }
  }
}

declare module 'aeria-sdk' {
  import { TopLevelObject } from 'aeria-sdk'

  type UnionToIntersection<T> = (T extends unknown ? ((x: T) => 0) : never) extends ((x: infer R) => 0)
    ? R
    : never

  type InferEndpoint<Route extends keyof MirrorRouter> = {
    [Method in keyof MirrorRouter[Route]]: Method extends RequestMethod
      ? MirrorRouter[Route][Method] extends infer Contract
        ? Contract extends
        | { response: infer RouteResponse }
        | { payload: infer RoutePayload  }
        | { query: infer RoutePayload  }
          ? MakeEndpoint<
            Route,
            Method,
            InferProperties<RouteResponse>,
            RoutePayload extends {}
              ? PackReferences<InferProperty<RoutePayload>>
              : undefined
          >
          : MakeEndpoint<Route, Method>
        : never
      : never
    } extends infer Methods
      ? Methods[keyof Methods]
      : never

  type Endpoints = {
    [Route in keyof MirrorRouter]: Route extends `/${infer Coll}/${infer Fn}`
      ? Coll extends keyof Collections
        ? Fn extends keyof CollectionFunctionsSDK
          ? Record<Coll, Record<
              Fn, {
              POST: CollectionFunctionsSDK<MirrorDescriptions[Coll]>[Fn]
            }
            >>
          : InferEndpoint<Route>
        : InferEndpoint<Route>
      : InferEndpoint<Route>
  } extends infer Endpoints
    ? UnionToIntersection<Endpoints[keyof Endpoints]>
    : never

  type TopLevelAeria = 
    & ((bearerToken?: string) => TopLevelObject & Endpoints)
    & TopLevelObject & Endpoints

  const topLevelAeria: TopLevelAeria

  export const url: string
  export const aeria: TopLevelAeria
  export default topLevelAeria
}


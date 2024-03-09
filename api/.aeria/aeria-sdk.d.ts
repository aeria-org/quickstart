import type {
  InferProperty,
  InferResponse,
  SchemaWithId,
  MakeEndpoint,
  RequestMethod,
  CollectionFunctions

} from '@aeriajs/types'

declare type MirrorDescriptions = {
  "user": {
    "$id": "user",
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
    "freshItem": {
      "active": true
    },
    "properties": {
      "name": {
        "type": "string"
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
          "type": "string"
        },
        "uniqueItems": true
      },
      "email": {
        "type": "string",
        "inputType": "email",
        "unique": true
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
          "filename",
          "link",
          "mime"
        ]
      },
      "picture": {
        "readOnly": true
      },
      "group": {
        "type": "string"
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
      "view",
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
      "ui:spawnEdit": {
        "name": "action.edit",
        "icon": "pencil-simple",
        "translate": true
      },
      "route:/dashboard/user/changepass": {
        "name": "Mudar senha",
        "icon": "key",
        "fetchItem": true
      },
      "remove": {
        "name": "action.remove",
        "icon": "trash",
        "ask": true,
        "translate": true
      },
      "ui:spawnView": {
        "name": "action.view",
        "icon": "magnifying-glass-plus",
        "translate": true
      },
      "ui:duplicate": {
        "name": "action.duplicate",
        "icon": "copy",
        "translate": true
      }
    },
    "icon": "users",
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
      "ui:spawnAdd": {
        "name": "action.add",
        "icon": "plus",
        "translate": true,
        "button": true
      }
    }
  },
  "file": {
    "$id": "file",
    "owned": "always",
    "presets": [
      "owned"
    ],
    "indexes": [
      "filename",
      "link",
      "mime"
    ],
    "properties": {
      "mime": {
        "type": "string"
      },
      "size": {
        "type": "number"
      },
      "last_modified": {
        "type": "string",
        "format": "date-time"
      },
      "filename": {
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
        "name": "Remover",
        "ask": true,
        "selection": true
      }
    },
    "individualActions": {
      "remove": {
        "name": "Remover",
        "icon": "trash",
        "ask": true
      }
    }
  },
  "tempFile": {
    "$id": "tempFile",
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
  "log": {
    "$id": "log",
    "required": [
      "context",
      "message"
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
        "variable": true
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
    "icon": "magnifying-glass",
    "presets": [
      "view"
    ],
    "filters": [
      "context",
      "message",
      "owner"
    ],
    "individualActions": {
      "ui:spawnView": {
        "name": "action.view",
        "icon": "magnifying-glass-plus",
        "translate": true
      }
    }
  },
  "resourceUsage": {
    "$id": "resourceUsage",
    "required": [],
    "properties": {
      "hits": {
        "type": "integer"
      },
      "last_maximum_reach": {
        "type": "string",
        "format": "date-time"
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
  "pizza": {
    "$id": "pizza",
    "icon": "pizza",
    "required": [
      "name"
    ],
    "properties": {
      "name": {
        "type": "string"
      },
      "flavor": {
        "literal": "cheese"
      },
      "price": {
        "type": "number"
      },
      "rating": {
        "type": "integer",
        "minimum": 1,
        "maximum": 5
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
      "crud"
    ],
    "actions": {
      "ui:spawnAdd": {
        "name": "action.add",
        "icon": "plus",
        "translate": true,
        "button": true
      }
    },
    "individualActions": {
      "ui:spawnEdit": {
        "name": "action.edit",
        "icon": "pencil-simple",
        "translate": true
      },
      "remove": {
        "name": "action.remove",
        "icon": "trash",
        "ask": true,
        "translate": true
      }
    }
  }
}


declare type MirrorRouter = {
  "/pizza/topRatedPizzas": {
    "GET": null
  },
  "/pizza/shampoo123": {
    "POST": {
      "payload": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "type": {
            "enum": [
              "dog",
              "alien",
              "human"
            ]
          }
        }
      },
      "response": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "age": {
              "type": "number"
            },
            "now": {
              "type": "string",
              "format": "date-time"
            }
          }
        }
      }
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
  import { TopLevelObject, TLOFunctions } from 'aeria-sdk'

  type UnionToIntersection<T> = (T extends any ? ((x: T) => 0) : never) extends ((x: infer R) => 0)
    ? R
    : never

  type Endpoints = {
    [Route in keyof MirrorRouter]: {
      [Method in keyof MirrorRouter[Route]]: Method extends RequestMethod
        ? MirrorRouter[Route][Method] extends infer Contract
          ? Contract extends
            | { response: infer RouteResponse }
            | { payload: infer RoutePayload  }
            | { query: infer RoutePayload  }
            ? MakeEndpoint<Route, Method, InferResponse<RouteResponse>, InferProperty<RoutePayload>>
            : MakeEndpoint<Route, Method>
          : never
        : never
    } extends infer Methods
      ? Methods[keyof Methods]
      : never
  } extends infer Endpoints
    ? UnionToIntersection<Endpoints[keyof Endpoints]>
    : never

  type StrongelyTypedTLO = TopLevelObject & Endpoints & {
    [K in keyof MirrorDescriptions]: SchemaWithId<MirrorDescriptions[K]> extends infer Document
      ? CollectionFunctions<Document> extends infer Functions
        ? Omit<TLOFunctions, keyof Functions> & {
          [P in keyof Functions]: {
            POST: Functions[P]
          }
        }
        : never
      : never
  }

  export const url: string
  export const aeria: StrongelyTypedTLO
}

  
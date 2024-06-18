import type {
  InferProperty,
  InferResponse,
  SchemaWithId,
  MakeEndpoint,
  RequestMethod,
  CollectionFunctionsSDK

} from '@aeriajs/types'

declare type MirrorDescriptions = {
  "person": {
    "$id": "person",
    "properties": {
      "name": {
        "const": "oi"
      },
      "pets": {
        "type": "array",
        "items": {
          "$ref": "pet",
          "indexes": [
            "name"
          ]
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
  "pet": {
    "$id": "pet",
    "properties": {
      "name": {
        "type": "string"
      },
      "details": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
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
    },
    "indexes": [
      "name"
    ]
  }
}


declare type MirrorRouter = {
  "/person/get": {
    "POST": {
      "builtin": true
    }
  },
  "/pet/get": {
    "POST": {
      "builtin": true
    }
  },
  "/pet/getAll": {
    "POST": {
      "builtin": true
    }
  },
  "/test": {
    "GET": null
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
            InferResponse<RouteResponse>,
            RoutePayload extends {}
              ? InferProperty<RoutePayload>
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
        ? Fn extends keyof CollectionFunctionsSDK<any>
          ? Record<Coll, Record<
              Fn, {
              POST: CollectionFunctionsSDK<SchemaWithId<MirrorDescriptions[Coll]>>[Fn]
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


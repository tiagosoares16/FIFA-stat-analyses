/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TransfersImport } from './routes/transfers'
import { Route as SquadBuilderImport } from './routes/squad-builder'
import { Route as PlayersImport } from './routes/players'
import { Route as CompareImport } from './routes/compare'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TransfersRoute = TransfersImport.update({
  id: '/transfers',
  path: '/transfers',
  getParentRoute: () => rootRoute,
} as any)

const SquadBuilderRoute = SquadBuilderImport.update({
  id: '/squad-builder',
  path: '/squad-builder',
  getParentRoute: () => rootRoute,
} as any)

const PlayersRoute = PlayersImport.update({
  id: '/players',
  path: '/players',
  getParentRoute: () => rootRoute,
} as any)

const CompareRoute = CompareImport.update({
  id: '/compare',
  path: '/compare',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/compare': {
      id: '/compare'
      path: '/compare'
      fullPath: '/compare'
      preLoaderRoute: typeof CompareImport
      parentRoute: typeof rootRoute
    }
    '/players': {
      id: '/players'
      path: '/players'
      fullPath: '/players'
      preLoaderRoute: typeof PlayersImport
      parentRoute: typeof rootRoute
    }
    '/squad-builder': {
      id: '/squad-builder'
      path: '/squad-builder'
      fullPath: '/squad-builder'
      preLoaderRoute: typeof SquadBuilderImport
      parentRoute: typeof rootRoute
    }
    '/transfers': {
      id: '/transfers'
      path: '/transfers'
      fullPath: '/transfers'
      preLoaderRoute: typeof TransfersImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/compare': typeof CompareRoute
  '/players': typeof PlayersRoute
  '/squad-builder': typeof SquadBuilderRoute
  '/transfers': typeof TransfersRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/compare': typeof CompareRoute
  '/players': typeof PlayersRoute
  '/squad-builder': typeof SquadBuilderRoute
  '/transfers': typeof TransfersRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/compare': typeof CompareRoute
  '/players': typeof PlayersRoute
  '/squad-builder': typeof SquadBuilderRoute
  '/transfers': typeof TransfersRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/compare' | '/players' | '/squad-builder' | '/transfers'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/compare' | '/players' | '/squad-builder' | '/transfers'
  id:
    | '__root__'
    | '/'
    | '/compare'
    | '/players'
    | '/squad-builder'
    | '/transfers'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CompareRoute: typeof CompareRoute
  PlayersRoute: typeof PlayersRoute
  SquadBuilderRoute: typeof SquadBuilderRoute
  TransfersRoute: typeof TransfersRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CompareRoute: CompareRoute,
  PlayersRoute: PlayersRoute,
  SquadBuilderRoute: SquadBuilderRoute,
  TransfersRoute: TransfersRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/compare",
        "/players",
        "/squad-builder",
        "/transfers"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/compare": {
      "filePath": "compare.tsx"
    },
    "/players": {
      "filePath": "players.tsx"
    },
    "/squad-builder": {
      "filePath": "squad-builder.tsx"
    },
    "/transfers": {
      "filePath": "transfers.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

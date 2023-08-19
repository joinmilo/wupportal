import { Routes } from '@angular/router'
import { IconName } from '@fortawesome/fontawesome-svg-core'

export type AdminMenuItem = {
  icon: IconName,
  name?: string,
  route?: string,
  childs?: AdminMenuItem[]
}

export type AdminRoutes = {
  code: string,
  routes: Routes,
}
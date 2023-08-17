import { IconName } from '@fortawesome/fontawesome-svg-core'

export type AdminMenuItem = {
  icon: IconName,
  name?: string,
  route: string[]
}
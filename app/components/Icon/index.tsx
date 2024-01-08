import { LucideProps, icons } from "lucide-react"

export type IconName = keyof typeof icons

type Props = {
  icon: IconName
} & LucideProps

export default function Icon({ icon, ...rest }: Props) {
  const Icon = icons[icon]

  return <Icon {...rest} />
}

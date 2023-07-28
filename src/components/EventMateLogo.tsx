import React from "react"
import Image from "next/image"

const EventMateLogo = ({ size }: { size?: number }) => (
  <Image
    priority
    src="/EventMateIcon.svg"
    alt="EventMateIcon"
    width={size ?? 30} height={(size ?? 30) * 1.109792}
  />
);

export default EventMateLogo
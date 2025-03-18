export const metadata = {
  title: 'Player Details'
};

export default function DetailsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main>{children}</main>
    )
  }
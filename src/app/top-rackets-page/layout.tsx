export const metadata = {
    title: 'Top Players'
  };
  
  export default function TopPlayersLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <main>{children}</main>
      )
    }
export const metadata = {
    title: 'Statistics'
  };
  
  export default function StatisticsLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <main>{children}</main>
      )
    }
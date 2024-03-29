const LandingPageLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <main className="h-full bg-[#1f2937] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full">
        { children }
      </div>
    </main>
  )
}

export default LandingPageLayout
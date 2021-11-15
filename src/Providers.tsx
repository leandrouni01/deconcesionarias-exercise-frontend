import React from 'react'
import{
QueryClient,
QueryClientProvider,
} from 'react-query'

const Providers:React.FC = ({children}) => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>

  )
}

export default Providers

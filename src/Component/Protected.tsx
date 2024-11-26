import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected(props: { cmp: any }) {
  let navigate = useNavigate()
  let Cmp = props.cmp
  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/register')
    }
  }, [])

  return (
    <div>
      <Cmp />
    </div>
  )
}

export default Protected 

import styled from 'styled-components'

const StyledBtn = styled.button`
  background-color: red;
  font-size: 1.5rem;
  color: #fff;
`

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <StyledBtn>Button</StyledBtn>
    </div>
  )
}

export default Landing
import styled from 'styled-components'


const Wrapper = styled.div`
  background-color: red;
  h1{
    font-weight: 800;
    color: #ffffff;
  }
  .content{
    background-color: blue;
  }
`

const Landing = () => {
  return (
    <Wrapper>
      <h1>Landing Page</h1>
      <div className="content">
        some content
      </div>
    </Wrapper>
  )
}

export default Landing
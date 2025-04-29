import './Search.css';
import { Form } from 'react-bootstrap';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='search'>
      <Form>
        <Form.Label htmlFor="searchTerm"></Form.Label>
        <Form.Control 
          aria-describedby="userInput" 
          id="searchTerm" 
          placeholder="Search through our movie database"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        ></Form.Control>
        <Form.Text id="userInput"></Form.Text>
      </Form>
    </div>
  )
}

export default Search
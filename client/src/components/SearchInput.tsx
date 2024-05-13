import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import ImageCards from './ImageCards.tsx';

export default function SearchInput() {
    const [jsonData, setJsonData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:3127/items');
            const data = await response.json();
            setJsonData(data);
            const filtered = jsonData.filter((item) => item.name.toLowerCase() === search.toLowerCase());
            setFilteredData(filtered);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

        setSearch('');
    };

    return (
        <>
            <Navbar className="bg justify-content-between">
                <Form onSubmit={handleSearch}>
                    <Row className="row">
                        <Col style={{ paddingLeft: '30px' }}>
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" style={{ backgroundColor: 'lightblue', borderColor: '#7adda0' }}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Navbar>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && <ImageCards filteredData={filteredData} />}
            {filteredData.length === 0 && <p>No matching results found.</p>}
        </>
    );
}

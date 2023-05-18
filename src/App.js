import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import Paper from '@mui/material/Paper';
import Footer from './footer';
import Header from './header';
import Alert from './alert';
import './App.css';

const App = () => {
  const [dni, setDNI] = useState('');
  const [name, setName] = useState('');
  const [organism, setOrganism] = useState('');
  const [organismList, setOrganismList] = useState([]);
  const [results, setResults] = useState([]);
  const [showAlert, setShowAlert] = useState({ text: '', type: '' });

  const handleShowAlert = (text, type) => {
    setShowAlert({ text, type });
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide the alert after 3 seconds (3000 milliseconds)
  };

  useEffect(() => {
    fetchOrganismList();
  }, []);

  const fetchOrganismList = async () => {
    try {
      const response = await fetch('http://onebyte.ddns.net:8000/api/organisms/');
      const data = await response.json();
      setOrganismList(data.data.data);
    } catch (error) {
      console.log('Error fetching organism list:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dni && !name && !organism) {
      return; // Prevent submit if any of the values is blank
    }
    try {
      const response = await fetch(`http://onebyte.ddns.net:8000/api/salary/?name=${name}&dni=${dni}&organism=${organism}`);
      const data = await response.json();
      if (data.data.Cantidad !== 0) {
        setResults(data.data.data);
      } else {
        handleShowAlert('No se encontraron resultados', 'error');
        return;
      }
    } catch (error) {
      console.log('Error fetching salary data:', error);
    }
  };

  return (
    <Container className="container">
      <Header />
      <form className="form" onSubmit={handleSubmit}>
        <Typography variant="h6" className="form-label">
          DNI:
          <TextField type="text" className="form-input" value={dni} onChange={(e) => setDNI(e.target.value)} />
        </Typography>
        <br />
        <Typography variant="h6" className="form-label">
          Name:
          <TextField type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
        </Typography>
        <br />
        <Typography variant="h6" className="form-label">
          Organism:
          <Select className="form-select" value={organism} onChange={(e) => setOrganism(e.target.value)}>
            <MenuItem value="">Select an organism</MenuItem>
            {organismList.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.organismo}
              </MenuItem>
            ))}
          </Select>
        </Typography>
        <br />
        <div className="submit-button-wrapper">
          <Button type="submit" variant="contained" color="primary">
            Encontra al Ñoqui
          </Button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="results">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>DNI</TableCell>
                  <TableCell>Agente</TableCell>
                  <TableCell>Jobs</TableCell>
                  <TableCell>Total Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.DNI}</TableCell>
                    <TableCell>{result.Agente}</TableCell>
                    <TableCell>
                      <ul>
                        {result.jobs.map((job, jobIndex) => (
                          <li key={jobIndex}>
                            Organism / Convenio: {job['Organismo / Convenio']}, Category: {job.Categoría}, Salary: {job.Salario}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{result['Total Salary']}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    {showAlert && <Alert text={showAlert.text} type={showAlert.type} />}
    <Footer />
  </Container>
  );
};      
export default App;


import React from 'react';
import DataTableComponent from './components/DataTableComponent.tsx';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>PrimeReact DataTable with Server-Side Pagination</h1>
            <DataTableComponent />
        </div>
    );
};

export default App;

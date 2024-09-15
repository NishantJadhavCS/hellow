import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Data {
    id: number;
    name: string;
    email: string;
}

const DataTableComponent: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [selectedRows, setSelectedRows] = useState<Data[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        // Fetch data from server
        axios.get(`http://localhost:5000/api/data/page/${page}`)
            .then(response => {
                setData(response.data.items);
                setTotalRecords(response.data.total);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [page]);

    const handlePageChange = (event: { first: number; rows: number; page: number }) => {
        setPage(event.page + 1); // Vite DataTable uses 0-based index
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <DataTable
                value={data}
                paginator
                rows={12}
                totalRecords={totalRecords}
                onPage={handlePageChange}
                selection={selectedRows}
                onSelectionChange={(e) => setSelectedRows(e.value)}
                dataKey="id"
                lazy
                first={0}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
            </DataTable>

            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>

            <style jsx>{`
                .pagination-controls {
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .pagination-controls button {
                    margin: 0 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default DataTableComponent;

/*
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Data {
    id: number;
    name: string;
    email: string;
}

const DataTableComponent: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [filteredData, setFilteredData] = useState<Data[]>([]);
    const [selectedRows, setSelectedRows] = useState<Data[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // Fetch data from server
        axios.get(`http://localhost:5000/api/data/page/${page}`)
            .then(response => {
                setData(response.data.items);
                setTotalRecords(response.data.total);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [page]);

    useEffect(() => {
        // Filter data based on search query
        const lowercasedQuery = searchQuery.toLowerCase();
        setFilteredData(
            data.filter(item =>
                item.name.toLowerCase().includes(lowercasedQuery) ||
                item.email.toLowerCase().includes(lowercasedQuery)
            )
        );
    }, [searchQuery, data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handlePageChange = (event: { first: number; rows: number; page: number }) => {
        setPage(event.page + 1); // Vite DataTable uses 0-based index
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <div className="search-container">
                <InputText
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name or email"
                    className="p-mb-2"
                />
            </div>

            <DataTable
                value={filteredData}
                paginator
                rows={12}
                totalRecords={totalRecords}
                onPage={handlePageChange}
                selection={selectedRows}
                onSelectionChange={(e) => setSelectedRows(e.value)}
                dataKey="id"
                lazy
                first={0}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
            </DataTable>

            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>

            <style jsx>{`
                .search-container {
                    margin-bottom: 1rem;
                    display: flex;
                    justify-content: center;
                }

                .pagination-controls {
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .pagination-controls button {
                    margin: 0 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default DataTableComponent;
*/
/*
import React, { useState, useEffect } from 'react';
import { DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Data {
    id: number;
    name: string;
    email: string;
}

const DataTableWithDropdown: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [selectedRows, setSelectedRows] = useState<Data[]>([]);
    const [dropdownOptions, setDropdownOptions] = useState<Data[]>([]);
    const [selectedRow, setSelectedRow] = useState<Data | null>(null);

    useEffect(() => {
        // Fetch data from server
        axios.get('http://localhost:5000/api/data/page/1')
            .then(response => {
                setData(response.data.items);
                setDropdownOptions(response.data.items);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDropdownChange = (e: any) => {
        const selected = e.value;
        setSelectedRow(selected);
        setSelectedRows([selected]); // Set selected row for DataTable
    };

    return (
        <div>
            <div className="dropdown-container">
                <Dropdown
                    value={selectedRow}
                    options={dropdownOptions}
                    onChange={handleDropdownChange}
                    optionLabel="name"
                    filter
                    filterBy="name"
                    placeholder="Select a row"
                    className="dropdown"
                />
            </div>

            <DataTable
                value={data}
                selection={selectedRows}
                onSelectionChange={(e) => setSelectedRows(e.value)}
                dataKey="id"
                paginator
                rows={12}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
            </DataTable>

            <style jsx>{`
                .dropdown-container {
                    margin-bottom: 1rem;
                    display: flex;
                    justify-content: center;
                }

                .dropdown {
                    width: 200px;
                }
            `}</style>
        </div>
    );
};

export default DataTableWithDropdown;
*/


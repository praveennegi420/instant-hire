import * as React from 'react';
import { useContext} from 'react';
import {useSelector} from 'react-redux'
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { ClipLoader } from "react-spinners";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Navbar from '../components/navbar';
import axios from 'axios'
import { useEffect, useState } from 'react';
import FilterAdminModal from '../components/filter';
interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone No.',
    },
    {
        id: 'experience',
        numeric: true,
        disablePadding: false,
        label: 'Experience',
    },
    {
        id: 'education',
        numeric: false,
        disablePadding: false,
        label: 'College',
    },
    {
        id: 'cgpa',
        numeric: true,
        disablePadding: false,
        label: 'CGPA',
    },
    {
        id: 'skills',
        numeric: false,
        disablePadding: false,
        label: 'Skills',
    },
    {
        id: 'salary',
        numeric: true,
        disablePadding: true,
        label: 'Expected CTC(in $)',
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='none'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Applicants
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <></>
            )}
        </Toolbar>
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [loading, setLoading] = React.useState(true);
    // const [rows, setRows]= React.useState([]);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [applicantData, setApplicantData] = React.useState([]);
    const {token} = useSelector((state) => state.auth);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:8080/api/job/applicants/64a07b0b3a56acd3358ae911', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => { setApplicantData(res.data.data); setLoading(false); })
                .catch(err => console.log(err))
        }
        fetchData();
    }, [])

    function createData(
        name: string,
        email: string,
        phone: string,
        experience: number,
        education: string,
        cgpa: number,
        skills: string,
        salary: number,
    ): Data {
        return {
            name,
            email,
            phone,
            experience,
            education,
            cgpa,
            skills,
            salary
        };
    }

    const rows = applicantData.map(user => {
        return createData(user.name, user.email, user.phone, user.experience, user.education, user.cgpa, user.skills, user.salaryexpect);
    });

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const filterFilter = async ({ date1, date2 }) => {

        const data = await axios.post('http://localhost:8080/api/job/applicants/64a07b0b3a56acd3358ae911', { firstDate: date1, lastDate: date2 },
            { headers: { Authorization: `Bearer ${user.data.token}` } });
        return data;
    }

    const filterData = ({ firstDate, secondDate }) => {
        setIsOpen(false)
        try {
            let MM = Number(firstDate.$M) + 1
            const date1 = firstDate.$y + '-' + MM + '-' + firstDate.$D || ''
            MM = Number(secondDate.$M) + 1
            const date2 = secondDate.$y + '-' + MM + '-' + secondDate.$D || ''

            filterFilter({ date1, date2 })
                .then(res => {
                    setLoading(false)
                    setTableData(res.data.data.booking)
                })
                .catch(err => setLoading(false))
        }
        catch (err) { }
    }

    return (
        <>
            <Navbar />
            <div className='flex justify-center items-center w-[100%]'>
                <Box sx={{ width: '90%', paddingTop: '5rem', margin: 'auto' }}>

                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <div className='flex '>
                            <EnhancedTableToolbar numSelected={selected.length} />
                            <div className='ml-auto mr-[4rem]' onClick={()=>{setIsOpen(true);}}>
                            <Tooltip title="Filter list" >
                                <IconButton>
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                            </div>
                        </div>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                {loading ? (<div className="text-center mx-auto mt-[4em]"><ClipLoader /></div>) : (
                                    <TableBody>
                                        {visibleRows.map((row, index) => {
                                            const isItemSelected = isSelected(row.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row.name)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell padding="none" over>{row.email}</TableCell>
                                                    <TableCell padding="none">{row.phone}</TableCell>
                                                    <TableCell padding="none">{row.experience}</TableCell>
                                                    <TableCell padding="none">{row.education}</TableCell>
                                                    <TableCell padding="none">{row.cgpa}</TableCell>
                                                    <TableCell padding='none'>{row.skills}</TableCell>
                                                    <TableCell >{row.salary}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (dense ? 33 : 53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>)}
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[8, 16, 32]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
                <FilterAdminModal isOpen={isOpen} setIsOpen={setIsOpen} handleFilter={filterData} />
            </div>
        </>
    );
}

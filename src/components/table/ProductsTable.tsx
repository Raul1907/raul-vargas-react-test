import React, { useState, useMemo, useRef } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Importamos el hook para despachar acciones de Redux
import { deleteProduct } from '../../features/products/productsSlice'; // Acción para eliminar productos
import styles from './ProductsTable.module.scss';
import { Product } from '../../types/Product';
import ConfirmationModal from '../modal/ConfirmatioModal';

const columnHelper = createColumnHelper<Product>();

interface ProductsTableProps {
  products: Product[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
  const currentProduct = useRef(0);
  const [pageSize] = useState(5); // Fijar el número de filas por página a 3
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Usamos dispatch para despachar acciones

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleConfirm = () => {
    dispatch(deleteProduct(currentProduct.current)); // Despachar la acción para eliminar el producto
    handleCloseModal();
  };

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => (
        <span className={styles.clickable}>
          {info.getValue()}
        </span>
      ),      
    }),
    // columnHelper.accessor('image', {
    //   header: 'Imagen',
    //   cell: info => (
    //     <img src={info.getValue()} alt="Product" className={styles.productImage} />
    //   ),
    // }),
    columnHelper.accessor('title', {
      header: 'Título',
      cell: info => (
        <span className={styles.clickable}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('price', {
      header: 'Precio',
      cell: info => `$${info.getValue().toFixed(2)}`,
    }),
    // columnHelper.accessor('category', {
    //   header: 'Categoría',
    // }),
    columnHelper.display({
      header: 'Acciones',
      cell: ({ row }) => (
        <div className={styles.actions}>
          <button
            className={styles.editButton}
            onClick={() => handleEdit(row.original.id)}
          >
            Editar
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(row.original.id)}
          >
            Eliminar
          </button>
        </div>
      ),
    }),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  function handleSearchChange (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  };

  function handleRowClick (id: number) {
    navigate(`/products/${id}`);
  };

  function handleEdit (id: number) {
    navigate(`/products/${id}/edit`); // Redirigir a la página de edición
  };

  function handleDelete (id: number) {
    currentProduct.current = id
    handleOpenModal();
  };

  const paginationRange = useMemo(() => {
    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;
    const delta = 2; // Rango a mostrar (2 atrás y 2 adelante)
    const range = [];
    const startPage = Math.max(1, currentPage - delta); // Página inicial del rango
    const endPage = Math.min(totalPages, currentPage + delta); // Página final del rango

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  }, [table.getState().pagination.pageIndex, table.getPageCount()]);

  return (
    <div className={styles.tableContainer}>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar el producto ${currentProduct.current}?`}
        onConfirm={handleConfirm}
        onCancel={handleCloseModal}
      />
      {/* Campo de búsqueda */}
      <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>

      {/* Tabla */}
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                if (cell.column.id !== 'Acciones') {
                  // Solo aplicamos el evento onClick en la columna de título
                  return (
                    <td
                      key={cell.id}
                      onClick={() => handleRowClick(row.original.id)}
                      className={styles.clickable}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                }
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className={styles.pagination}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </button>

        {paginationRange.map(page => (
          <button
            key={page}
            onClick={() => table.setPageIndex(page - 1)}
            className={table.getState().pagination.pageIndex + 1 === page ? styles.activePage : ''}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;

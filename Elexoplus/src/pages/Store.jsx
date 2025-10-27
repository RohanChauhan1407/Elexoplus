import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MOCK_PRODUCTS, FILTER_CONFIG, SORT_OPTIONS } from '../assets/MockData'
import { FilterIcon, XIcon, ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Store/Icons'
import { RadioOption, CheckboxOption} from '../components/Store/options';
import ProductCard from '../components/Store/ProductCard';

// --- COMPONENTS ---

// --- Product Grid ---
const ProductGrid = React.forwardRef(({ products, isSidebarOpen }, ref) => (
  <main
    ref={ref} // Attach the ref here
    className={`flex-1 grid gap-x-4 gap-y-8 transition-all duration-300
        grid-cols-2 
        ${
          isSidebarOpen
            ? 'md:grid-cols-2 lg:grid-cols-3' // Sidebar OPEN
            : 'md:grid-cols-3 lg:grid-cols-4' // Sidebar CLOSED
        }
      `}
  >
    {products.length > 0 ? (
      products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <div className="col-span-full text-center text-gray-400 py-16">
        <h3 className="text-xl font-medium">No Products Found</h3>
        <p>Try adjusting your filters.</p>
      </div>
    )}
  </main>
));

// --- Filter Components ---
const FilterGroup = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="py-6 border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center"
      >
        <h3 className="font-medium text-base text-white">{title}</h3>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-none mt-4' : 'max-h-0'
        }`}
      >
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
};

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5; // Max 5 page numbers (e.g., 1 ... 3 4 5 ... 10)
    const ellipsis = '...';

    if (totalPages <= maxPagesToShow + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1); // Always show first page

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        items.push(ellipsis);
      }

      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      if (end < totalPages - 1) {
        items.push(ellipsis);
      }

      items.push(totalPages); // Always show last page
    }
    return items;
  };

  const paginationItems = getPaginationItems();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-full enabled:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        <ChevronLeftIcon />
      </button>

      {paginationItems.map((item, index) => (
        <button
          key={index}
          onClick={() => typeof item === 'number' && onPageChange(item)}
          disabled={item === '...'}
          className={`h-10 w-10 rounded-full text-sm font-medium ${
            item === currentPage
              ? 'bg-yellow-500 text-black' // Active page remains high-contrast
              : 'text-white hover:bg-gray-700'
          } ${item === '...' ? 'cursor-default' : ''}`}
        >
          {item}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full enabled:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        <ChevronRightIcon />
      </button>
    </nav>
  );
};

// --- SortMenu Component (for Desktop) ---
const SortMenu = ({ options, selectedOption, onSelect, onClose }) => {
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-lg z-20 border border-gray-700 overflow-hidden"
    >
      <ul className="py-1">
        {options.map((option) => (
          <li key={option.value}>
            <button
              onClick={() => onSelect(option.value)}
              className={`w-full text-left px-4 py-2 text-sm ${
                selectedOption === option.value
                  ? 'font-medium text-black bg-yellow-500'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Filter Sidebar (Desktop) ---
const FilterSidebar = ({ isOpen, filters, onFilterChange }) => {
  const handleCheckboxChange = (filterId, value) => {
    const currentValues = filters[filterId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(filterId, newValues);
  };

  return (
    // `hidden md:block` ensures it's never visible on mobile
    // Apply transitions for width, padding, and opacity
    <aside
      className={`hidden md:block flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-64 pr-8 opacity-100' : 'w-0 pr-0 opacity-0'
      }`}
    >
      <nav className="w-64">
        {FILTER_CONFIG.map((group) => (
          <FilterGroup key={group.id} title={group.name}>
             {/* All groups now use CheckboxOption */}
              {group.options.map((opt) => (
                <CheckboxOption
                  key={opt.value}
                  id={`desktop-${group.id}-${opt.value}`}
                  name={`desktop-${group.id}-${opt.value}`}
                  value={opt.value}
                  label={opt.label}
                  checked={(filters[group.id] || []).includes(opt.value)}
                  onChange={() => handleCheckboxChange(group.id, opt.value)}
                />
              ))}
          </FilterGroup>
        ))}
      </nav>
    </aside>
  );
};

// --- Filter Modal (Mobile) ---
const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  clearAllFilters,
}) => {
  const handleCheckboxChange = (filterId, value) => {
    const currentValues = filters[filterId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(filterId, newValues);
  };

  return (
    <>
      {/* --- Overlay --- */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* --- Modal Content --- */}
      <div
        className={`fixed bottom-0 left-0 right-0 h-[90vh] w-full bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } flex flex-col rounded-t-2xl`}
      >
        {/* --- Modal Header --- */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-300"
          >
            Clear All
          </button>
          <h2 className="text-lg font-medium text-white">
            Filter & Sort
          </h2>
          <button onClick={onClose} className="text-white">
            <XIcon />
          </button>
        </div>

        {/* --- Modal Body (Scrollable) --- */}
        <div className="flex-1 overflow-y-auto p-4">
          <FilterGroup title="Sort By" defaultOpen={true}>
            {SORT_OPTIONS.map((opt) => (
              <RadioOption
                key={opt.value}
                id={`mobile-sort-${opt.value}`}
                name="mobile-sort"
                value={opt.value}
                label={opt.label}
                checked={sortBy === opt.value}
                // Sort By uses RadioOption, but its handler is different
                onChange={() => onSortChange(opt.value)}
              />
            ))}
          </FilterGroup>

          {FILTER_CONFIG.map((group) => (
            <FilterGroup key={group.id} title={group.name} defaultOpen={true}>
                {/* All groups now use CheckboxOption */}
                {group.options.map((opt) => (
                  <CheckboxOption
                    key={opt.value}
                    id={`mobile-${group.id}-${opt.value}`}
                    name={`mobile-${group.id}-${opt.value}`}
                    value={opt.value}
                    label={opt.label}
                    checked={(filters[group.id] || []).includes(opt.value)}
                    onChange={() => handleCheckboxChange(group.id, opt.value)}
                  />
                ))}
            </FilterGroup>
          ))}
        </div>

        {/* --- Modal Footer --- */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0 bg-gray-900">
          <button
            onClick={onClose}
            className="w-full bg-white text-black py-3 rounded-full font-medium text-lg"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};


// --- Main Store Component ---
const Store = () => {
  // --- STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('featured');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 18;

  // REMOVED productGridRef
  // --- Bring back isInitialRender ref ---
  const isInitialRender = useRef(true);

  // --- DERIVED STATE (Filtering Logic) ---
  const filteredProducts = useMemo(() => {
        let products = [...MOCK_PRODUCTS];

    // Apply filters
    Object.entries(filters).forEach(([filterId, value]) => {
      // Check if value is falsy, or an empty array
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return;
      }

      products = products.filter((product) => {
        // UPDATED: Filter by 'categories'
        if (filterId === 'categories') {
          // 'value' is an array e.g. ['Heating Appliances', 'Summer Collection']
          return value.includes(product.category); // Use product.category now
        }

        // --- UPDATED Price Logic ---
        if (filterId === 'price') {
          // 'value' is an array e.g. ['0-5000', '10001-15000']
          // Check if the product's price matches ANY of the selected ranges
          return value.some(priceRange => {
            const [min, max] = priceRange.split('-').map(Number);
            return product.price >= min && product.price <= max;
          });
        }
        return true;
      });
    });

    // Apply sorting
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return b.id - a.id; // Assuming higher ID is newer
        case 'featured':
        default:
          return 0; // No change for "featured"
      }
    });

    return products;
  }, [filters, sortBy]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // --- Effect to reset page on filter/sort change ---
  useEffect(() => {
    // Only reset page if it's not the initial render
    if (!isInitialRender.current) {
        setCurrentPage(1);
    }
  }, [filters, sortBy]);

  // --- UPDATED Effect to scroll when currentPage changes ---
  useEffect(() => {
     // Check if it's the initial render. If so, mark it as false and return.
     if (isInitialRender.current) {
        isInitialRender.current = false;
        return; // Don't scroll on initial render
     }

     // Otherwise (not initial render), scroll window to top.
     window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [currentPage]); // Dependency array remains currentPage


  // --- EVENT HANDLERS ---
  const handleFilterChange = (filterId, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // REMOVED scroll logic from here, it's now in useEffect
  };

  const clearAllFilters = () => {
    setFilters({});
    setSortBy('featured');
    // Reset page to 1 when clearing filters
    setCurrentPage(1);
    // REMOVED explicit scroll on clear
  };


  const selectedFilterCount = useMemo(() => {
        return Object.values(filters).reduce((acc, value) => {
      if (Array.isArray(value)) {
        return acc + value.length;
      }
      // This case should no longer happen for filters, but safe to keep
      if (value) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [filters]);

  return (
    // Apply dark theme styles directly
    <div className="font-sans antialiased bg-black text-gray-200 min-h-screen pt-24 md:pt-32">

      {/* ADDED top margin class mt-16 */}
      <div className="container mx-auto p-4 ">
        {/* === TOP CONTROLS (Desktop & Mobile) === */}
        <div
          className="flex justify-between items-center mb-4 md:mb-6"
        >
          <h1 className="text-2xl font-medium text-white">
            ({filteredProducts.length}) Results
          </h1>
          <div className="flex items-center space-x-4">
            {/* --- Desktop Controls (Hidden on mobile) --- */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex items-center space-x-2 text-base text-white"
            >
              <span>{isSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
              <FilterIcon />
            </button>

            {/* --- Desktop Sort (Hidden on mobile) --- */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="flex items-center space-x-1 text-base text-white"
              >
                <span>
                  Sort By: {SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label}
                </span>
                {isSortMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
              {isSortMenuOpen && (
                <SortMenu
                  options={SORT_OPTIONS}
                  selectedOption={sortBy}
                  onSelect={(value) => {
                    handleSortChange(value);
                    setIsSortMenuOpen(false);
                  }}
                  onClose={() => setIsSortMenuOpen(false)}
                />
              )}
            </div>

            {/* --- Mobile Controls (Hidden on desktop) --- */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="md:hidden flex items-center space-x-2 text-base text-white"
            >
              <span>Filter</span>
              {selectedFilterCount > 0 && (
                <span className="bg-yellow-500 text-black rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {selectedFilterCount}
                </span>
              )}
              <FilterIcon />
            </button>
          </div>
        </div>

        {/* === MAIN CONTENT (Sidebar + Grid) === */}
        <div className="flex gap-4">
          {/* === Desktop Sidebar === */}
          <FilterSidebar
            isOpen={isSidebarOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* === Product Grid === */}
          <ProductGrid
            // REMOVED REF FOR GRID
            products={paginatedProducts}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        {/* === NEW: PAGINATION === */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* === Mobile Filter Modal (Slide-up) === */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        clearAllFilters={clearAllFilters}
      />
    </div>
  );
};

export default Store;
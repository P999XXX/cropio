const DashboardProducts = () => {
  return (
    <div className="space-y-4 p-1 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage your product catalog.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Add Product
          </button>
          <button className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Import
          </button>
        </div>
      </div>
      <div className="bg-card rounded-lg border p-4">
        <p className="text-center text-muted-foreground">No products found.</p>
      </div>
    </div>
  );
};

export default DashboardProducts;
namespace Core.Entities
{
    public class Basket
    {
        public Guid Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            // Si no hemos creado el item en el basket, entonces lo creamos
            // La funcion de all verificara que ninguno de los items contenga el producto que queremos añadir al basket
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem
                {
                    Quantity = quantity,
                    Product = product
                });
            }

            // Verificamos que el item exista, de ser asi, aumentamos la cantidad
            var itemExist = Items.FirstOrDefault(item => item.ProductId == product.Id);

            if (itemExist != null)
            {
                itemExist.Quantity += quantity;
            }
        }

        public void RemoveItem(Guid id, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == id);

            if (item == null)
            {
                return;
            }

            item.Quantity -= quantity;

            if (item.Quantity <= 0)
            {
                Items.Remove(item);
            }
        }
    }
}
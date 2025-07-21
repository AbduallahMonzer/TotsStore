namespace TotsStoreApi.Models
{
    public class OrderRequest
{
    public int ProductId { get; set; }
    public string CustomerName { get; set; }
    public string CustomerEmail { get; set; }
    public string CustomerPhone { get; set; }    // new
    public string CustomerAddress { get; set; }  // new
    public int Quantity { get; set; }
}

}

using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IOT_SOCKET_BE.Hubs
{
    public class Chathub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            // Gửi tin nhắn đến tất cả các client đang kết nối
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}

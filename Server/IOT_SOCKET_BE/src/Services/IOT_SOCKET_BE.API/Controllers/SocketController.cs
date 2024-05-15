using IOT_SOCKET_BE.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace IOT_SOCKET_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocketController : ControllerBase
    {
        private readonly IHubContext<Chathub> _hubContext;

        public SocketController(IHubContext<Chathub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(string user, string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", user, message);
            return Ok();
        }
    }
}

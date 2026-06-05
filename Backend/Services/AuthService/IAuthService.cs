using Triveni.Backend.DTOs.Auth;

namespace Triveni.Backend.Services.AuthService
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto request);
    }
}

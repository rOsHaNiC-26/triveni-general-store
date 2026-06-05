using AutoMapper;
using Triveni.Backend.Models;
using Triveni.Backend.DTOs.Auth;
using Triveni.Backend.DTOs.Order;

namespace Triveni.Backend.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add mappings here
            CreateMap<User, RegisterRequestDto>().ReverseMap();
            CreateMap<User, AuthResponseDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Success, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Message, opt => opt.MapFrom(src => "Success"));
                
            CreateMap<Order, PlaceOrderRequestDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
        }
    }
}

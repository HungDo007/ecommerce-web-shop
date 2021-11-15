using Application.ViewModels.Common;
using System.Collections.Generic;
using System.Linq;

namespace Application.Common
{
    public static class PagingService
    {
        public static PagedResult<T> Paging<T>(List<T> query, int pageIndex, int pageSize)
        {
            //Paging
            int totalRow = query.Count;
            var data = query.Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();


            //Select and projection
            var pagedResult = new PagedResult<T>()
            {
                TotalRecords = totalRow,
                PageIndex = pageIndex,
                PageSize = pageSize,
                Items = data
            };
            return pagedResult;
        }
    }
}

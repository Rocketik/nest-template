import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rows_per_page?: number = 10;
}

export class PaginationWithSearchQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  query?: string = "";
}

export class SearchQueryDro {
  @IsOptional()
  @IsString()
  query?: string = "";
}

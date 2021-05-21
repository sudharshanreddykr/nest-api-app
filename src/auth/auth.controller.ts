import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
  Param,
  Res,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt.guard";
import { UserService } from "./user/user.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post("login")
  @HttpCode(200)
  @ApiOkResponse({ description: "Login Successful" })
  @ApiBadRequestResponse({
    description: "User does not exists or invalid login details",
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("register")
  @ApiCreatedResponse({ description: "New user account created" })
  @ApiBadRequestResponse({ description: "User already exists or server error" })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req: any) {
    // user : userId, email : from JwtStrategy
    return this.userService.findById(req.user.userId);
  }
  // @Post("upload")
  // @UseInterceptors(FileInterceptor("file", { dest: "./images" }))
  // uploadFile(@UploadedFile() files: any): any {
  //   //return "success";
  //   console.log(files);
  // }
  @Post("file")
  @UseInterceptors(FilesInterceptor("image"))
  uploadFile(@UploadedFiles() file) {
    console.log(file);
  }
  @Post("upload")
  @UseInterceptors(FileInterceptor("photo", { dest: "./uploads" }))
  uploadSingle(@UploadedFile() file) {
    console.log(file);
  }

  @Post("uploads")
  @UseInterceptors(FilesInterceptor("photos[]", 10))
  uploadMultiple(@UploadedFiles() files) {
    console.log(files);
  }
  @Get(":imgpath")
  seeUploadedFile(@Param("imgpath") image, @Res() res) {
    return res.sendFile(image, { root: "./uploads" });
  }
}

# Database ve ORM

Veriyi depolamak için Prisma ORM ile birlikte PostgreSQL database kullandım.
PostgreSQL serveri Supabase'de deploy edili.

# Database Schema

User
Proje gereksinimlerinde yoktu fakat her uygulamanın olmazsa olmazı kullanıcı bazlı işlemleri de dahil etmek istedim.
userName alanını unique olarak işaretledim.
signUp ve updateById servis methodları userName benzersizliğini kontrol ediyor.

Task
title alanı unique string olarak, isCompleted alanı ise boolean olarak belirlendi.
title alanı yine User modelinin userName benzersizliğinde olduğu gibi TasksService'in create ve updateById servis methodlarında benzersizliği kontrol ediliyor.
Proje gereksinimlerinde completed yazıyordu fakat projelerimde her zaman boolean değerleri 'is' prefix ile isimlendirdim, burada da öyle kullanmak istedim.

Relationship
Users ve Tasks modelleri arasında one-to-many ilişkisi var, 1 kullanıcı birden fazla Task'a sahip olabilir ve aynı zamanda bir Task yalnızca 1 kullanıcıya ait olabilir.

# Routing

Oluşturduğum controller yapısına göre index.ts controllers/ klasörü içindeki tüm dosyaları .controllers.ts suffix'i olanları filtreleyelerek okuyor ve bu suffix'i çıkartarak baştaki kalan kısmı o controllerdaki tüm methodların URL route başlangıcı yapıyor.
Bu sayede her bir controller için ekstra bir import'a gerek kalmıyor.

# DTO & validateDtoMiddleware

DTO modeller için interface yerine class-validator decoratorlar'ı ile birlikte class tanımlamaları kullandım.
Bunun yanında da middleware kullanınca, kullanıcı input doğrulama işini iş mantığından tamamen ayırabiliyoruz.
Gerekli doğrulamalar için DTO sınıflarındaki alanları decoratorlar ile işaretlenmesi yetiyor ve geri kalan tüm doğrulama işini validateDtoMiddleware üstleniyor.
Eğer ki forma uymayan bir değer var ise validateDtoMiddleware uygun şekilde cevap dönüyor 400 status code'u ile ve istek hiç route'a ulaşamıyor.
Route tanımlanırken validateDtoMiddleware'in ilk argünamına doğrulanacak class DTO verilmesi yeterli.

# Response

Tüm response interface'leri ResponseBase interface'ini extend etmek zorunda.
ResponseBase ise her cevabın olmazsa olmazları isSuccess, message ve statusCode alanlarını içeriyor.

# authorizationMiddleware

Korunmak istenen routelar'da kullanıcı doğrulama için yazılmış middleware.
Gelen istekteki http only jwt cookie'i alarak doğrulama yapıyor.
Eğer kullanıcı doğrulanamazsa 401 status code'u ile cevap dönülüyor ve istek hiç route'a ulaşamıyor.

# Error Handling

İş mantığı içerisinde hata yönetimi try-catch blokları ile sağlanıyor.
Eğer bir hata fırlar ise catch içerisinde yakalanıp konsole error log ediliyor ve 500 status code'u ile "internal server error" mesajı dönülüyor.

# Folder Structure

Uygulamanın kapsamı küçük olduğundan klasör yapısı layere-based (controllers, services, types...).
Uygulamanın kapsamı daha büyük olsaydı feature-based bir yapı (features/users, features/tasks) kullanılabilirdi.

# Unit Tests

# Dockerfile

Uygulamayı Dockerfile ile Docker Image'u oluşturup, bu Image'i Docker Hub hesabıma push edip, oradan da bu Image'i kullanarak Render'a deploy ettim.
Docker Image: https://hub.docker.com/r/altnbsmehmet/case-study-task-management-api

# Swagger

API dokümantasyonu swagger commentler'i ile oluşturuldu.
--> https://case-study-task-management-api-latest.onrender.com/api-docs

# Canlı

API Domain: https://case-study-task-management-api-latest.onrender.com

# Database ve ORM

Veriyi depolamak için Prisma ORM ile birlikte PostgreSQL database kullandım.
PostgreSQL serveri Supabase'de deploy edili.

# Database Schema

User
Proje gereksinimlerinde yoktu fakat her uygulamanın olmazsa olmazı kullanıcı bazlı işlemleri de dahil etmek istedim bu tablo ile userName alanını unique olarak işaretledim.
signUp ve updateById servis methodları userName benzersizliğini kontrol ediyor.

Task
title alanı unique string olarak, isCompleted alanı ise boolean olarak belirlendi.
title alanı yine User modelinin userName benzersizliğinde olduğu gibi TasksService'in create ve updateById servis methodlarında benzersizliği kontrol ediliyor.
Proje gereksinimlerinde completed yazıyordu fakat projelerimde her zaman boolean değerleri 'is' prefix ile isimlendirdim, burada da öyle kullanmak istedim.

Relationship
Users ve Tasks modelleri arasında one-to-many ilişkisi var, 1 kullanıcı birden fazla Task'a sahip olabilir ve aynı zamanda bir Task yalnızca 1 kullanıcıya ait olabilir.

# Routing

Oluşturduğum controller yapısına göre index.ts controllers/ klasörü içindeki tüm dosyları okuyor ve .controller.ts suffix'i çıkartarak baştaki kalan kısmı o controllerdaki tüm methodların route başlangıcı yapıyor.
Bu sayede her bir controller için ekstra bir import'a gerek kalmıyor. Ekstra olarak dosyanın

# dto validation with middleware

authorizationMiddleware

error handling

response base

folder structure is layer based due to the small scope of application, feature-based could be used if scope of the app would be bigger

unit tests

docker file

swagger

production live url:
production swagger url:

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Clock, Apple, Coins } from "lucide-react";

export default function GetInvolved() {
  const [activeTab, setActiveTab] = useState("donate");

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-800/30 dark:text-green-300">
              شارك
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              انضم إلى مهمتنا
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              هناك العديد من الطرق للمساهمة في قضيتنا. حدد الخيار الذي يتردد
              صداه معك.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl mt-12">
          <Tabs
            defaultValue="donate"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="donate">مال</TabsTrigger>
              <TabsTrigger value="food">طعام</TabsTrigger>
              <TabsTrigger value="items">عناصر</TabsTrigger>
              <TabsTrigger value="volunteer">تطوع</TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="donate" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-green-600" />
                      تبرع بالمال
                    </CardTitle>
                    <CardDescription>
                      تساعدنا مساهمتك المالية على توسيع عملياتنا والوصول إلى
                      المزيد من المجتمعات.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {["500دج", "1000دج", "2000دج"].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          className="h-20 text-lg"
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                        Donate Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="food" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Apple className="h-5 w-5 text-green-600" />
                      تبرع بالطعام
                    </CardTitle>
                    <CardDescription>
                      شارك فائض طعامك مع أولئك الذين هم في أمس الحاجة إليه. كل
                      وجبة مهمة.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">نحن نقبل:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>المواد الغذائية غير القابلة للتلف</li>
                      <li>منتجات طازجة من حدائق أو مزارع</li>
                      <li>فائض الطعام من المطاعم والمقاهي</li>
                      <li>المواد الغذائية السائبة من الشركات المصنعة</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      ابحث عن مواقع النزول{" "}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="items" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-green-600" />
                      تبرع بالعناصر
                    </CardTitle>
                    <CardDescription>
                      ساهم بالمعدات أو الإمدادات أو الموارد الأخرى لدعم
                      عملياتنا.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">العناصر التي نحتاجها:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>حاويات تخزين الطعام</li>
                      <li>معدات النقل</li>
                      <li>أدوات البستنة لمشاريع التسميد</li>
                      <li>اللوازم المكتبية للعمل الإداري</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      اتصل بنا للتبرع{" "}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="volunteer" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      وقت التطوع
                    </CardTitle>
                    <CardDescription>
                      شارك مهاراتك ووقتك لمساعدتنا على إحداث تأثير أكبر في
                      مجتمعنا.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">فرص التطوع:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>جمع وتوزيع الغذاء</li>
                      <li>التسميد وصيانة الحدائق</li>
                      <li>التواصل المجتمعي والتعليم</li>
                      <li>الدعم الإداري والفني</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      قم بالتسجيل في التطوع{" "}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

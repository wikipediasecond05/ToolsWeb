
import { PageWrapper } from '@/components/layout/PageWrapper';
import type { Metadata } from 'next';
import { APP_NAME, APP_DOMAIN } from '@/lib/constants';
import { Icons } from '@/components/icons'; // Ensure Icons are imported

export const metadata: Metadata = {
  title: { absolute: 'Terms of Use' },
  description: `Read the Terms of Use for ${APP_NAME} (${APP_DOMAIN}). Understand your responsibilities and our disclaimers.`,
};

export default function TermsOfUsePage() {
  return (
    <PageWrapper>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Terms of Use
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>

      <div className="max-w-3xl mx-auto space-y-10 md:space-y-12 pb-12">
        <section>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Welcome to {APP_NAME} (referred to as "{APP_DOMAIN}", "we", "us", or "our"). These Terms of Use ("Terms") govern your access to and use of our website {APP_DOMAIN}, including any content, functionality, and services offered on or through {APP_DOMAIN} (the "Site").
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Please read these Terms carefully before you start to use the Site. By using the Site, you accept and agree to be bound and abide by these Terms and our Privacy Policy, found at <a href="/privacy" className="text-primary hover:underline">/privacy</a>, incorporated herein by reference. If you do not want to agree to these Terms or the Privacy Policy, you must not access or use the Site.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.Settings2 className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">Use of the Site</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>The tools and information provided on {APP_NAME} are for general informational and utility purposes only. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Site for your personal, non-commercial use, or legitimate business purposes related to your role as a developer, content creator, or digital professional.</p>
          </div>
        </section>
        
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.User className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">User Responsibility</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>You are responsible for your use of the tools and services provided on the Site. Any data you input into the tools is processed at your own risk. For tools that operate client-side, your data remains within your browser. For tools that may require server interaction (which will be clearly indicated), we take measures to protect data, but you acknowledge that transmission of information over the internet is not entirely secure.</p>
            <p>You agree to use the Site and its tools in a lawful manner and not for any purpose that is prohibited by these Terms or by applicable law.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.ShieldOff className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">No Guarantees or Warranties</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>THE SITE AND ITS CONTENT, TOOLS, AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE MAKE NO WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SITE.</p>
            <p>WITHOUT LIMITING THE FOREGOING, NEITHER {APP_NAME} NOR ANYONE ASSOCIATED WITH {APP_NAME} REPRESENTS OR WARRANTS THAT THE SITE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE SITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</p>
            <p>WE HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
          </div>
        </section>
        
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.AlertTriangle className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>IN NO EVENT WILL {APP_NAME}, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SITE OR SUCH OTHER WEBSITES, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.Ban className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">Prohibited Usage</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to use the Site:</p>
            <ul>
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To engage in any activity that interferes with or disrupts the Site or the servers and networks connected to the Site.</li>
              <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site.</li>
              <li>To use any robot, spider, or other automatic device, process, or means to access the Site for any purpose, including monitoring or copying any of the material on the Site, without our prior written consent.</li>
              <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
            </ul>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.Copyright className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">Intellectual Property Rights</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by {APP_NAME}, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.Link className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">Third-Party Links and Advertising</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>The Site may contain links to third-party websites or services that are not owned or controlled by {APP_NAME}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that {APP_NAME} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>
            <p>The Site may display advertisements from third parties, such as Google AdSense. Your interactions with these advertisements are governed by the terms and policies of the third-party advertisers.</p>
          </div>
        </section>
        
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.FileEdit className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">Changes to the Terms of Use</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Site following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Icons.Mail className="h-7 w-7 text-primary" />
            <h2 className="text-2xl font-semibold">Contact Information</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>If you have any questions about these Terms of Use, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
          </div>
        </section>
        
        {/* <!-- AdSense Placeholder: Terms of Use Content Area --> */}
      </div>
    </PageWrapper>
  );
}
